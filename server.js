var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var mysql
var con
var fc = 0 // record broadcast(fight , counter) or emit all(other)
var port = 7777

function mysqlConnect(){
  mysql = require('mysql');                                                                                      
  con = mysql.createConnection({
    host: "localhost",
    user: "wp2017_groupj",
    password: "groupj",
    database: "wp2017_groupj"
  });
  con.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
  });
}
function mysqlDisconnect(){
  con.end();
}


app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/public', express.static(__dirname + '/public'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

server.lastPlayerID = 0

server.listen(process.env.PORT || port, function () {
  console.log('Listening on ' + server.address().port)
})

/*
TODO:
1.把沒有用的socket關掉，避免浪費資源
2.把已經不在的player的資料去除
*/

// 有新的client連接就會進入connection的callback function，傳入一個socket，可以利用這個socket跟client溝通
io.on('connection', function (socket) {
  // socket.on 監聽
  var userName = '';
  socket.on('newplayer', function (info) {
    // listen使用者登入資訊
    socket.on('accInfoSocket', function(accInfo){
      mysqlConnect();
      //console.log('Username from socket = ' + accInfo[0])
      //console.log('Password from socket = ' + accInfo[1])
      var id;
      var query = con.query("SELECT * FROM user_info", function (err, result, fields) {
        if (err) throw err;
        for (var i in result){
          //console.log('username from table = ' + result[i].username);
          //console.log('password from table = ' + result[i].pass);
          if(accInfo[0] == result[i].username && accInfo[1] == result[i].pass){
            console.log('User found!');
            userName = accInfo[0];
            id = result[i].ID;
            //console.log('here' + id)
            info.userName = userName
            //allPlayerInfo.hall.push(info)
            break;
          }
        }
        info.userID = id
        console.log('Debugger = ' + info.userName + ' ' + info.userID )
        allPlayerInfo.hall.push(info)
        console.log('A player is connecting......' + ' player ID = ' + id)
        socket.emit('askplayerID', info)
        socket.emit('loginStateConfirmSocket', info.userName)
        socket.emit('joining')

        socket.on('disconnect', function(){
          console.log(info.userName + ' disconnected');
          deletePlayer(info.userID)
          io.in('room123').clients((err, clients) => {
            io.sockets.in('room123').emit('ready', clients.length);
          })
        })
      mysqlDisconnect();
      });
    })
    
    socket.on('room', function(room){
      socket.join(room);
      //console.log('join room '+room)
      io.in('room123').clients((err, clients) => {
        io.sockets.in(room).emit('ready', clients.length);
        if(clients.length == 10){
          //start timer
          
        }
      });
    });
    
    socket.on('pending', function(status, callback){
      io.in('room123').clients((err, clients) => {
        callback(clients.length)
      }); 
    }) 
    
    //get serverTime
    socket.on('serverTime', function(status, callback){
      date = new Date()
      callback(date.getTime())
    })

    socket.on('accRegisterSocket', function(accInfo){
      mysqlConnect();
      var temp = 1
      var qString;
      var att;
      var query = con.query("SELECT * FROM user_info", function (err, result, fields){
        if (err) throw err;
        var repeat = 0;
        for(var i in result){
          if(accInfo[0] == result[i].username){
            repeat = 1;
            break;
          }
        }
        if(repeat == 1){ //repeat username founded
          console.log('register_repeat')
          socket.emit('sqlRegisterFailed', 'repeat');
        }
        else if(repeat == 0){ //no repeat
          console.log('register_success')
          var newID = makeID();
          qString = "INSERT INTO user_info(username, pass, ID)";
          qString += "VALUES ('" + accInfo[0] + "', '" + accInfo[1] + "', '" + newID + "');"
          console.log('qString = ' + qString)
          console.log(newID);
          temp = 2
          con.query(qString, function(err, results, fields){
            console.log("real success")
            mysqlDisconnect()
          })
        }
      });
    }); 
    // give player an id (15 random char)

    // listen update info
    socket.on('updateInfo', function (data) {
      // send newest data to all client
      fc = 0
      var newData = processUpdateInfo(data)
      if(fc === 1){
        socket.broadcast.emit('updateResult', newData)
      }
      else{
        io.sockets.emit('updateResult', newData)
      }
    })

    socket.on('playerDie', function(data){
      console.log('lasy')
      console.log(data.userID + 'die')
      deletePlayer(data.userID)
    })

    socket.on('checkAlive', function(status, callback){
      callback(allPlayerInfo.hall.length)
      console.log('checkAlive = '+allPlayerInfo.hall.length)
    })

  })
})

var allPlayerInfo = {
  'hall': [],
  'room': []
}

function makeID () {
  var id = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 15; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return id
}

function ssearchIndex (id) {
  for (let i = 0; i < allPlayerInfo.hall.length; i++) {
    if (allPlayerInfo.hall[i].userID === id) {
      return i
    }
  }
  return -1
}

function deletePlayer(id){
  var n = ssearchIndex(id)
  allPlayerInfo.hall.splice(n, 1);
  showAll(n)
}

function processUpdateInfo (data) {
  var searched = []
  var n = ssearchIndex(data.userID)
  console.log(n)
  var enermy

/* 同步 */
  allPlayerInfo.hall[n] = data

/****SEARCH******************************************************/
  var percent = 80
  if(allPlayerInfo.hall[n].heroChoose === 'poet'){
    percent += 10
  }

  
  // when player search
  if (data.heroState.search === 1) {

    console.log(allPlayerInfo.hall[n].userName + " press search button")

    //如果有search到的人，把他push到searched[]中
    for (let i = 0; i < allPlayerInfo.hall.length; i++) {
      // 不是自己 && 找地點一樣的 && 沒有在打架的
      if ((allPlayerInfo.hall[i].userID != data.userID) && (allPlayerInfo.hall[i].heroState.locate === data.heroState.locate)) {
        searched.push(allPlayerInfo.hall[i].userID)
      }
    }

    // 如果有找到一個以上的人，先判斷找到人(80%)還是找到物品(20%)
    if (searched.length > 0) {
      var random = Math.floor((Math.random() * 100) + 1)
      console.log("randomm 的數字 = " + random)

      //如果找到人，從searched隨機中選擇一個人
      if (random < percent) {
        enermy = searched[Math.floor((Math.random() * searched.length))]
        console.log('enermy id = ' + enermy)
        allPlayerInfo.hall[n].heroState.searched.enermy = enermy
        allPlayerInfo.hall[n].heroState.searched.found = 1
        allPlayerInfo.hall[n].heroState.search = 0

      } 
      else { //找到物品
        allPlayerInfo.hall[n].heroState.searched.enermy = 0
        allPlayerInfo.hall[n].heroState.searched.found = 0
        allPlayerInfo.hall[n].heroState.search = 0
      }
    }
  }

/****FIGHT***********************************************************/

  // 找到人之後的兩秒內，如果選擇打那個人(enermy)，fight會等於1
  if (data.heroState.searched.fight === 1) {
    fc = 1;
    //找enermy的index
    var z = ssearchIndex(data.heroState.searched.enermy)
    allPlayerInfo.hall[n].heroState.searched.fight = 0
    allPlayerInfo.hall[z].heroState.searched.fighted = 1

    if(allPlayerInfo.hall[n].heroChoose === "assassin"){
      allPlayerInfo.hall[z].heroState.searched.skillEffect = 1
    }

    if(allPlayerInfo.hall[n].heroChoose === "ninja"){
      allPlayerInfo.hall[z].heroState.searched.skillEffect = 2
    }

    //利用反擊率，隨機會不會成功反擊
    var counter = Math.floor((Math.random() * 100) + 1)
    console.log("counter = " + counter)

    if(counter < allPlayerInfo.hall[n].heroState.counterPercent){
      console.log("in counter")
      allPlayerInfo.hall[n].heroState.searched.counter = 1;
    }
  }

  showAll(n)
  allPlayerInfo.hall[n].heroState.search = 0

  return allPlayerInfo
}

function showAll(n){
  console.log('--------------All player info-------------')


  for (let i = 0; i < allPlayerInfo.hall.length; i++) {
    console.log(JSON.stringify(allPlayerInfo.hall[i]))
    allPlayerInfo.hall[n].heroState.search = 0
  }
  console.log('------------------------------------------\n')
  
}

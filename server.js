var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)
var mysql
var con
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
var port = 7777

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
    console.log("lalala" + JSON.stringify(info))
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
        //console.log(info)
        //con.end()
      });
      mysqlDisconnect();
    })
    
    socket.on('accRegisterSocket', function(accInfo){
      mysqlConnect();
      var temp = 1
      var qString;
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
          //socket.emit('registerDone', repeat);
        }
        else if(repeat == 0){ //no repeat
          console.log('register_success')
          var newID = makeID();
          qString = "INSERT INTO user_info(username, pass, ID)";
          qString += "VALUES ('" + accInfo[0] + "', '" + accInfo[1] + "', '" + newID + "');"
          console.log('qString = ' + qString)
          console.log(newID);
          temp = 2
          //socket.emit('registerDone', repeat);
        }
      });
      //query = con.query(qString);
      while(1){
        console.log("while")
        if(temp != 1){
          console.log('start query')
          con.query(qString)
          break
        }
      }
      mysqlDisconnect();
    }); 
    // give player an id (15 random char)

    // listen update info
    socket.on('updateInfo', function (data) {
      // send newest data to all client
      io.sockets.emit('updateResult', processUpdateInfo(data))
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
    console.log('check'+i)
    if (allPlayerInfo.hall[i].userID === id) {
      return i
    }
  }
  return -1
}

function processUpdateInfo (data) {
  var searched = []
  var n = ssearchIndex(data.userID)
  console.log(n)
  var enermy

/* 同步 */
  allPlayerInfo.hall[n] = data

/* SEARCH******************************************************/

  // when player search
  if (data.heroState.search === 1) {
    // search all player, push to searched
    for (let i = 0; i < allPlayerInfo.hall.length; i++) {
      if (allPlayerInfo.hall[i].userID != data.userID && allPlayerInfo.hall[i].heroState.locate === data.heroState.locate) {
        searched.push(allPlayerInfo.hall[i].userID)
      }
    }

    // find out which player searched
    if (searched.length > 0) {
      // random probability, 80% search enermy , 20% search treasure
      // 1 - 10 , if 1~8=enermy
      var random = Math.floor((Math.random() * 10) + 1)
      console.log('random = ' + random)
      if (random < 9) {
        // choose an enermy
        enermy = searched[Math.floor((Math.random() * searched.length))]
        console.log('enermy id = ' + enermy)

        // change info, player who search and searched
        allPlayerInfo.hall[n].heroState.searched.enermy = enermy
      } else {
        allPlayerInfo.hall[n].heroState.searched.enermy = '0'
      }
    }

    console.log('searched = ' + searched)
  }

/* FIGHT***********************************************************/

  if (data.heroState.searched.fight === 1) {
    var z = ssearchIndex(data.heroState.searched.enermy)
    //allPlayerInfo.hall[z].heroState.hp = allPlayerInfo.hall[z].heroState.hp - 10
    /////////////////////////////////////// above something wrong
    allPlayerInfo.hall[n].heroState.searched.enermy = '0'
    allPlayerInfo.hall[n].heroState.searched.fight = 0
  }
  //allPlayerInfo.hall[n].heroState.search = 0
  showAll(n)
  return allPlayerInfo
}

function showAll(n){
  console.log('--------------All player info-------------')

  allPlayerInfo.hall[n].heroState.search = 0

  for (let i = 0; i < allPlayerInfo.hall.length; i++) {
    console.log(JSON.stringify(allPlayerInfo.hall[i]))
  }
  console.log('------------------------------------------\n')
  
}

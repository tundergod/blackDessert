var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/public', express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

server.lastPlayerID = 0
var port = 9876

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
  socket.on('newplayer', function (info) {

    // give player an id (15 random char)
    var id = makeID()
    console.log('A player is connecting......' + ' player ID = ' + id)
    info.userID = id
    allPlayerInfo.hall.push(info)
    socket.emit('askplayerID', info)

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
    allPlayerInfo.hall[z].heroState.hp = allPlayerInfo.hall[z].heroState.hp - 10
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

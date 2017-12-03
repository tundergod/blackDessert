var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io').listen(server)

app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

server.lastPlayerID = 0
var port = 7777

server.listen(process.env.PORT || port, function () {
  console.log('Listening on ' + server.address().port)
})

// 有新的client連接就會進入connection的callback function，傳入一個socket，可以利用這個socket跟client溝通
io.on('connection', function (socket) {

  // socket.on 監聽
  socket.on('newplayer', function () {

    socket.player = {
      id: server.lastPlayerID++
    }
    console.log('A player is logging in ')

    // socket.emit server <--> client
    socket.emit('allplayers', getAllPlayers())

    //give player an id -> client
    socket.emit('askplayerID', socket.player.id)

    // 對所有socket(除了自己)傳訊息，公告有玩家進入地圖
    socket.broadcast.emit('newplayers', socket.player)

    //update info
    socket.on('updateInfo',function(data){
      console.log('update = ' + JSON.stringify(data) + '\n')

      //send newest data to all client
      io.sockets.emit('updateResult', processUpdateInfo(data))
    })

    // 監聽disconnect事件
    socket.on('disconnect', function () {
      // 對所有client傳訊息
      io.emit('remove', socket.player.id)
    })

  })
})

function getAllPlayers () {
  var players = []
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player
    if (player) players.push(player)
  })
  return players
}

var allPlayerInfo = []
var gameInfo = {
  "playerAlive":"",
  "playerLocate":{
    "map":"",
    "castle":"",
    "forest":"",
    "lake":"",
    "town":"",
    "cave":""
  }
}

function processUpdateInfo(data){

  // if add new player else update
  if(data.playerState == 0){
    allPlayerInfo[allPlayerInfo.length] = data
  }
  else{
    allPlayerInfo[data.username] = data
  }

  // when player search
  if(data.heroState.search == 1){
    for(let i = 0; i < allPlayerInfo.length ; i++){
      if(i != data.username && allPlayerInfo[i].heroState.locate == data.heroState.locate){
        allPlayerInfo[i].heroState.hp = allPlayerInfo[i].heroState.hp - 10
        console.log(allPlayerInfo[i].heroState.hp)
      }
    }
  }

  console.log('all = ' + JSON.stringify(allPlayerInfo) + '\n')
  return allPlayerInfo
}

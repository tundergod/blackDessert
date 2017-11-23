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
port = 7778

server.listen(process.env.PORT || port, function () {
  console.log('Listening on ' + server.address().port)
})

// 有新的client連接就會進入connection的callback function，傳入一個socket，可以利用這個socket跟client溝通
io.on('connection', function (socket) {

  // socket.on是監聽事件
  // 以下監聽newplayer事件
  socket.on('newplayer', function () {
    socket.player = {
      id: server.lastPlayerID++
    }
    console.log("A player is logging in ")

    // socket.emit server <--> client
    socket.emit('allplayers', getAllPlayers())

    // 對所有socket傳訊息
    socket.broadcast.emit('newplayer', socket.player)

    // JSON for connected players
    console.log("----Player list:----\n" + JSON.stringify(getAllPlayers()) + "\n")

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

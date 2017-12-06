var Client = {}

Client.socket = io.connect()

/**********************************************************************/

// 1.發送登入訊息給服務器
Client.askNewPlayer = function () {
  Client.socket.emit('newplayer')
}

// 2.接收確認與ID
Client.socket.on('askplayerID', function(data){
  console.log("Your ID is " + data)
  playerInfo.username = data
})

// 3.接收遊戲中的所有玩家ID
Client.socket.on('allplayers', function (data) {
  console.log('Login SUCCESS!!!!!!')
  playerInfo.username = data.id
  console.log('----Players online:----\n' + JSON.stringify(data) + '\n')
})

/**********************************************************************/

// 通知所有client有新的玩家加入,並告知ID
Client.socket.on('newplayers', function (data) {
  console.log('A new players JOIN the game!!!! player ID = ' + JSON.stringify(data.id))
})

/**********************************************************************/
var j=0
// 傳送操作資訊給服務器
Client.sendUpdateInfo = function(){
  Client.socket.emit('updateInfo',playerInfo)

}

Client.socket.on('updateResult', function(data){
  //console.log(JSON.stringify(data))
  playerInfo.heroState.hp = data[playerInfo.username].heroState.hp
  textHP.text = playerInfo.heroState.hp
  console.log(j++ + 'result = ' + JSON.stringify(playerInfo))
})


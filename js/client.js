var Client = {}

Client.socket = io.connect()

/**********************************************************************/

// 1.發送登入訊息給服務器
Client.askNewPlayer = function () {
  Client.socket.emit('newplayer',playerInfo)
}

// 2.接收確認與ID
Client.socket.on('askplayerID', function(data){
  console.log("Your ID is " + data.userid)
  playerInfo = data
})

// 傳送操作資訊給服務器
Client.sendUpdateInfo = function(){
  Client.socket.emit('updateInfo',playerInfo)

}

Client.socket.on('updateResult', function(data){
  var n = searchIndex(data, playerInfo.userid)
  playerInfo = data.hall[n]

  // textHP havent create before state = 2
  if(playerInfo.playerState === 2){
    textHP.text = playerInfo.heroState.hp
  }

  /*FIGHT*/
  if(playerInfo.heroState.searched.enermy != "0"){
    fight.visible = true;
  }
})

function searchIndex(data, id){
  for(let i = 0; i < data.hall.length; i++){
    if(data.hall[i].userid === id){
      return i
    }
  }
}

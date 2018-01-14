var Client = {}

Client.socket = io.connect()

/**********************************************************************/

// 1.發送登入訊息給服務器
Client.askNewPlayer = function () {
  Client.socket.emit('newplayer', playerInfo)
}

// 1-1. 送玩家輸入的帳號密碼去伺服器
Client.loginAcc = function(accInfo){
  //console.log("accInfo from client : " + accInfo)
  Client.socket.emit('accInfoSocket', accInfo)
}
// 1-1-2, 送註冊訊息過去伺服器
Client.registerAcc = function(accInfo){
  Cliennt.socket.emit('accRegisterSocket',accInfo)
}

// 1-2. 確認帳號對不對
/*Client.socket.on('loginStateConfirmSocket', function(data){
  playerInfo.userName = data;
  console.log('1-2socket = '+playerInfo.userName)
})*/

// 2.接收確認與ID
Client.socket.on('askplayerID', function (data) {
  console.log('Your ID is ' + data.userID)
  playerInfo = data
  //console.log(playerInfo)
})

// 傳送操作資訊給服務器
Client.sendUpdateInfo = function () {
  Client.socket.emit('updateInfo', playerInfo)
  //console.log(playerInfo)
}

Client.socket.on('updateResult', function (data) {
  var n = searchIndex(data, playerInfo.userID)
  playerInfo = data.hall[n]

  if(typeof(sceneState.hpText) != "undefined"){
    sceneState.hpText = playerInfo.heroState.hp
  }
  
  /* FIGHT */
  if (playerInfo.heroState.searched.enermy != '0') {
    console.log("search an enermy!")  
  }

  if(playerInfo.heroState.searched.fighted === 1){
    console.log("been attacked!!!!!!!!")
    game.state.start('miniGameState')
  }

  if(playerInfo.heroState.hp < 0){
    game.state.start('gameOverState')
  }

})

function searchIndex (data, id) {
  for (let i = 0; i < data.hall.length; i++) {
    if (data.hall[i].userID === id) {
      return i
    }
  }
}

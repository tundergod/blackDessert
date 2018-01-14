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
  if(playerInfo.userID){
    var n = searchIndex(data, playerInfo.userID)
    // copy data
    playerInfo = data.hall[n]

    // update hp
    if(typeof(sceneState.hpText) != "undefined"){
      sceneState.hpText = playerInfo.heroState.hp
    }
    /* FIGHT , 2 second*/
    if (playerInfo.heroState.searched.enermy != 0) {
      console.log("search an enermy!") 
      sceneState.attackButton.loadTexture("attackButtonActive")                                                                          
      sceneState.attackButton.inputEnabled = true                                                                                          
      sceneState.attackButton.events.onInputDown.add(sceneState.pressAttack)
      sceneState.enermy.visible = true
      sceneState.enermyid.text = "xxx"
      sceneState.enermyhp.text = "xxx"
      sceneState.enermyatk.text = "xxx"
      sceneState.enermydef.text = "xxx"
      sceneState.time.events.add(Phaser.Timer.SECOND * 2, back, this)
    } 

    if(playerInfo.heroState.searched.fighted === 1){
      playerInfo.heroState.fighting = 1 
      playerInfo.heroState.searched.fighted = 0
      console.log("attacked!!!!!!!!")
      game.state.start('miniGameState', true, false, sceneState.sceneData)
    }

    if(playerInfo.heroState.hp < 0){
      game.state.start('gameOverState')
    } 
  }
})

function back(){
  console.log("hello")
  sceneState.attackButton.loadTexture("attackButton")
  sceneState.attackButton.inputEnabled = false
  sceneState.enermy.visible = false
  sceneState.enermyid.text = ""
  sceneState.enermyhp.text = ""
  sceneState.enermyatk.text = ""
  sceneState.enermydef.text = ""
}

function searchIndex (data, id) {
  for (let i = 0; i < data.hall.length; i++) {
    if (data.hall[i].userID === id) {
      return i
    }
  }
}

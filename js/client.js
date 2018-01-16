var Client = {}
var button = []
var count = 0
var speed = 600
var numButton = 5
var numLine = 4
var enermyDef

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
  Client.socket.emit('accRegisterSocket',accInfo)
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
    // copy playerInfo data
    playerInfo = data.hall[n]
    var z = searchIndex(data, playerInfo.heroState.searched.enermy)

    // update player hp
    if(typeof(sceneState.hpText) != "undefined"){
      sceneState.hpText.text = 'HP:' + playerInfo.heroState.hp
      if(playerInfo.heroState.hp <= 0){
        game.state.start("gameOverState")
      }
    }

    // fight button , 3 second colddown
    if (playerInfo.heroState.searched.found === 1) {
      console.log("search an enermy!") 
      playerInfo.heroState.searched.found = 0
      Client.sendUpdateInfo()
      sceneState.attackButton.loadTexture("attackButtonActive")                                                                          
      sceneState.attackButton.inputEnabled = true                                                                                          
      sceneState.attackButton.events.onInputDown.add(sceneState.pressAttack)
      sceneState.enermy.visible = true
      sceneState.enermyid.text = data.hall[z].userName
      sceneState.enermyhp.text = data.hall[z].heroState.hp
      sceneState.enermyatk.text = data.hall[z].heroState.atk
      sceneState.enermydef.text = data.hall[z].heroState.def
      enermyDef = data.hall[z].heroState.def
      sceneState.time.events.add(Phaser.Timer.SECOND * 3, back, this)
    } 

    // 如果被打
    if(playerInfo.heroState.searched.fighted === 1){
      skillEffect()
      playerInfo.heroState.searched.fighted = 0
      playerInfo.heroState.searched.counter = 0
      playerInfo.heroState.searched.found = 0
      Client.sendUpdateInfo()
      console.log("fighted")
      miniGame()
    }
  
    // 如果被反擊
    if(playerInfo.heroState.searched.counter === 1){
      skillEffect()
      playerInfo.heroState.searched.counter = 0
      playerInfo.heroState.searched.fighted = 0
      playerInfo.heroState.searched.found = 0
      Client.sendUpdateInfo()
      console.log("counter")
      miniGame()
    }

  }
})

function skillEffect(){
  /*skill effect*/
  if(playerInfo.heroChoose === 'warrior'){
    console.log("skill1")
    numButton -= 2
  }

  if(playerInfo.heroChoose === 'nun'){
    console.log("skill2")
    speed -= 200
  }

  if(playerInfo.heroState.searched.skillEffect === 1){
    console.log("skill3")
    playerInfo.heroState.searched.skillEffect = 0
    speed += 200
  }

  if(playerInfo.heroState.searched.skillEffect === 2){
    console.log("skill4")
    playerInfo.heroState.searched.skillEffect = 0
    numButton += 2
  }

}

function back(){
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


function miniGame(){

  // 開啓物理引擎
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.physics.arcade.gravity.y = speed

  // 時間函數，間隔0.2秒觸發numButton次
  game.time.events.repeat(Phaser.Timer.SECOND * 0.2, numButton, createButton)
  
  function createButton(){
    var random = Math.floor((Math.random() * numLine))
    button[count] = game.add.sprite(0, -100, 'ball')
    button[count].scale.setTo(0.35, 0.35)
    button[count].position.x = game.world.centerX - (button[count].width * (numLine / 2) - 10 * (numLine / 2)) + (button[count].width * random + 10 * random)  
    game.physics.enable(button[count], Phaser.Physics.ARCADE)
    button[count].inputEnabled = true
    button[count].events.onInputDown.add(boom,{n : count})
    count++
  }

  function boom(){
    var boom = game.add.sprite(button[this.n].position.x, button[this.n].position.y, 'kaboom')
    boom.animations.add('booooom');
    boom.animations.play('booooom', 80, false, true);
    button[this.n].destroy()
  }
}

function minusHP(){
  console.log("edef = " + enermyDef)
  playerInfo.heroState.hp = playerInfo.heroState.hp - (playerInfo.heroState.atk - enermyDef);
  Client.sendUpdateInfo()
}

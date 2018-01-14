var sceneState = {}
var searchTimer
//var scenesPic = ['castle', 'forest', 'town', 'lake', 'cave'] 
/*
TODO:
1.畫背景圖
2.畫退出圖
3.畫有沒有遇到敵人的圖
4.把所有人物圖割成剛剛好的大小
5.hp bar
6.skill setting
*/

sceneState.init = function(sceneData){
  sceneState.sceneData = sceneData
}

sceneState.update = function(){
  sceneState.timerText.text = updateTimer()                                                                                 
}


sceneState.create = function(){

/*****send message to server*****/

  playerInfo.playerState = state[6]                                                                                       
  Client.sendUpdateInfo()

/********************************/

  console.log('----sceneState----')
  console.log("in " + scenesPic[sceneState.sceneData])

  // add screen shake plugin
  game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);

  sceneState.bg = sceneState.add.sprite(0,0,scenesPic[sceneState.sceneData] + 'BG')
  sceneState.bg.scale.setTo(scaleX, scaleY)

  sceneState.hero = sceneState.add.sprite(0, 0, playerInfo.heroChoose)
  sceneState.hero.scale.setTo(scaleX,scaleY)
  sceneState.hero.anchor.setTo(-0.05,-0.2)

  sceneState.walkButton = sceneState.add.sprite(0,0,'walkButtonActive')
  sceneState.walkButton.scale.setTo(scaleX,scaleY)
  sceneState.walkButton.anchor.setTo(-4.1,-1.9)
  sceneState.walkButton.inputEnabled = true
  sceneState.walkButton.events.onInputDown.add(sceneState.search)

  sceneState.attackButton = sceneState.add.sprite(0,0,'attackButton')
  sceneState.attackButton.scale.setTo(scaleX,scaleY)
  sceneState.attackButton.anchor.setTo(-5.2,-3.3)

  sceneState.backButton = sceneState.add.sprite(0,0,'exitButton')
  sceneState.backButton.scale.setTo(scaleX,scaleY)
  sceneState.backButton.anchor.setTo(-22.5,-0.2)
  sceneState.backButton.inputEnabled = true 
  sceneState.backButton.events.onInputDown.add(sceneState.backState)

  sceneState.skillFrame = sceneState.add.sprite(0,0,'skillFrame')
  sceneState.skillFrame.scale.setTo(scaleX,scaleY)
  sceneState.skillFrame.anchor.setTo(-0.2,-1.7)

  sceneState.skillButton = sceneState.add.sprite(0,0,'skillButton')
  sceneState.skillButton.scale.setTo(scaleX,scaleY)
  sceneState.skillButton.anchor.setTo(-0.63,-3.05)
  sceneState.skillButton.inputEnabled = true
  sceneState.skillButton.events.onInputDown.add(sceneState.skill)

  sceneState.enermy = sceneState.add.sprite(0,0,'enermyInfo')
  sceneState.enermy.scale.setTo(scaleX, scaleY)
  sceneState.enermy.position.x = width - 20 - sceneState.enermy.width
  sceneState.enermy.position.y = height - sceneState.enermy.height*2
  sceneState.enermy.visible = false

  sceneState.enermyid = sceneState.add.text(0, 0, '', {font:"12px Arial", fill:"red"})
  sceneState.enermyid.position.x = sceneState.enermy.position.x + sceneState.enermy.width/4
  sceneState.enermyid.position.y = sceneState.enermy.position.y + sceneState.enermy.height/6.8

  sceneState.enermyhp = sceneState.add.text(0, 0, '', {font:"12px Arial", fill:"red"})
  sceneState.enermyhp.position.x = sceneState.enermy.position.x + sceneState.enermy.width/4
  sceneState.enermyhp.position.y = sceneState.enermy.position.y + sceneState.enermy.height/3.3

  sceneState.enermyatk = sceneState.add.text(0, 0, '', {font:"12px Arial", fill:"red"})
  sceneState.enermyatk.position.x = sceneState.enermy.position.x + sceneState.enermy.width/4
  sceneState.enermyatk.position.y = sceneState.enermy.position.y + sceneState.enermy.height/2.1

  sceneState.enermydef = sceneState.add.text(0, 0, '', {font:"12px Arial", fill:"red"})
  sceneState.enermydef.position.x = sceneState.enermy.position.x + sceneState.enermy.width/4
  sceneState.enermydef.position.y = sceneState.enermy.position.y + sceneState.enermy.height/1.5

  sceneState.hpText = sceneState.add.text(0, 0, 'HP:' + playerInfo.heroState.hp, {font:"32px Arial", fill:"red"})

  sceneState.timerText = sceneState.add.text(sceneState.world.centerX, 10, '', {font: "32px Arial", fill: "#fff"})
  sceneState.timerText.anchor.setTo(0.5, 0)
}

sceneState.search = function(){
  console.log("search")
  game.plugins.screenShake.shake(30);
  sceneState.walkButton.loadTexture("walkButton")
  sceneState.walkButton.inputEnabled = false
  sceneState.time.events.add(Phaser.Timer.SECOND * 3, sceneState.searchBack, this)

/*****send message to server*****/
  playerInfo.heroState.search = 1
  Client.sendUpdateInfo()
/********************************/
}

sceneState.searchBack = function(){
  console.log("hhh")
  sceneState.walkButton.loadTexture("walkButtonActive")
  sceneState.walkButton.inputEnabled = true
}

sceneState.skill = function(){
  console.log("use skill www")
  
/*****send message to server*****/

/********************************/

}

sceneState.backState = function(){

/*****send message to server*****/

  playerInfo.heroState.locate = ''

/********************************/

  game.state.start('mapState', false, false, sceneState.sceneData)
}

sceneState.pressAttack = function(){

  sceneState.attackButton.loadTexture("attackButton")
  sceneState.attackButton.inputEnabled = false
  console.log('attack')
  playerInfo.heroState.searched.fight = 1
  playerInfo.heroState.fighting = 1
  Client.sendUpdateInfo()
  game.state.start('miniGameState', false, false, sceneState.sceneData)
}


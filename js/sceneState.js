var sceneState = {}

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

sceneState.init = function(data){
  sceneState.scene = scenesPic[data]
  sceneState.data = data
}

sceneState.create = function(){
  console.log('----sceneState----') 
  console.log("in " + sceneState.scene)

  sceneState.bg = sceneState.add.sprite(0,0,sceneState.scene + 'BG')
  sceneState.bg.scale.setTo(scaleX, scaleY)

  sceneState.hero = sceneState.add.sprite(0,0,'ninja')
  sceneState.hero.scale.setTo(scaleX,scaleY)
  sceneState.hero.anchor.setTo(-0.2,-0.2)

  sceneState.walkButton = sceneState.add.sprite(0,0,'walkButton')
  sceneState.walkButton.scale.setTo(scaleX,scaleY)
  sceneState.walkButton.anchor.setTo(-4.8,-2.1)
  sceneState.walkButton.inputEnabled = true
  sceneState.walkButton.events.onInputDown.add(sceneState.search)

  sceneState.attackButton = sceneState.add.sprite(0,0,'attackButton')
  sceneState.attackButton.scale.setTo(scaleX,scaleY)
  sceneState.attackButton.anchor.setTo(-6,-3.7)
  sceneState.attackButton.inputEnabled = true 
  sceneState.attackButton.events.onInputDown.add(sceneState.attack)

  sceneState.backButton = sceneState.add.sprite(0,0,'attackButton')
  sceneState.backButton.scale.setTo(scaleX,scaleY)
  sceneState.backButton.anchor.setTo(-7.5,-0.2)
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
}

sceneState.search = function(){
  console.log("search")
}

sceneState.skill = function(){
  console.log("use skill www")
}

sceneState.backState = function(){
  game.state.start('mapState')
}

sceneState.attack = function(){
  console.log('attack')
  game.state.start('miniGameState', false, false, sceneState.data)
}

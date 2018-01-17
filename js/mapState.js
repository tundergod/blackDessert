var mapState = {}
mapState.name = []
mapState.scenesImg = []
/*
mapState.init = function(data){
  mapState.hero = data
}
*/
mapState.update = function(){
  Client.socket.emit('serverTime', 'getServerTime', function(response){
    timeCurrent = response;
    time = Math.round((timeCurrent - chooseState.timeStart) / 1000);
    min = Math.floor(time / 60)
    sec = time % 60
    result = (min < 10) ? "0" + min : min;
    result += (sec < 10) ? ":0" + sec : ":" + sec;
    mapState.timerText.text = result
  })  
}

mapState.create = function(){

/*****send message to server*****/

  playerInfo.playerState = state[5]                                                                                       
  Client.sendUpdateInfo()

/********************************/
  console.log('----mapState----') 
  mapState.bg = mapState.add.sprite(0,0,'background')
  mapState.bg.scale.setTo(scaleX, scaleY)

  mapState.map = mapState.add.sprite(0,0,'map')
  mapState.map.scale.setTo(scaleX, scaleY)
  mapState.map.position.x = game.world.centerX - mapState.map.width/2
  mapState.map.position.y = game.world.centerY - mapState.map.height/2
  
  for(let i = 0; i < 5; i++){
    mapState.scenesImg[i] = mapState.add.sprite(0,0,scenesPic[i])
    mapState.scenesImg[i].scale.setTo(scaleX ,scaleY)
    mapState.scenesImg[i].inputEnabled = true
    mapState.scenesImg[i].events.onInputDown.add(mapState.nextState,{scene:i})
  }
  
  // set anchor
  mapState.scenesImg[0].anchor.setTo(-1.8,-1)
  mapState.scenesImg[1].anchor.setTo(-1.58,-0.8)
  mapState.scenesImg[2].anchor.setTo(-4,-0.25)
  mapState.scenesImg[3].anchor.setTo(-2.6,-1.68)
  mapState.scenesImg[4].anchor.setTo(-3,-4.3)
  
  mapState.timerText = mapState.add.text(mapState.world.centerX, 10, '', {font: "32px Arial", fill: "#fff"})
  mapState.timerText.anchor.setTo(0.5, 0)
}

mapState.nextState = function(){

/*****send message to server*****/

  playerInfo.heroState.locate = scenesPic[this.scene]

/********************************/

  game.state.start('sceneState', true, false, this.scene)
}

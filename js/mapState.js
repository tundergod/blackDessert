var mapState = {}
mapState.name = []
mapState.scenesImg = []

mapState.create = function(){
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
    mapState.scenesImg[i].events.onInputDown.add(mapState.nextState,{n:i})
  }
  
  // set anchor
  mapState.scenesImg[0].anchor.setTo(-1.8,-1)
  mapState.scenesImg[1].anchor.setTo(-1.58,-0.8)
  mapState.scenesImg[2].anchor.setTo(-4,-0.25)
  mapState.scenesImg[3].anchor.setTo(-2.6,-1.68)
  mapState.scenesImg[4].anchor.setTo(-3,-4.3)

  // scene name
  /*
  TODO:
  1.調整圖片名字的位置
  */
  mapState.name[0] = mapState.add.text(mapState.scenesImg[0].position.x , mapState.scenesImg[0].position.y,'a')
  mapState.name[1] = mapState.add.text(mapState.scenesImg[1].position.x , mapState.scenesImg[1].position.y,'b')
  mapState.name[2] = mapState.add.text(mapState.scenesImg[2].position.x , mapState.scenesImg[2].position.y,'c')
  mapState.name[3] = mapState.add.text(mapState.scenesImg[3].position.x , mapState.scenesImg[3].position.y,'d')
  mapState.name[4] = mapState.add.text(mapState.scenesImg[4].position.x , mapState.scenesImg[4].position.y,'e')
}

// 0 to 4
mapState.nextState = function(){
  //game.state,start(state, clear world, clear cache, param1, param2, ...)
  game.state.start('sceneState', true, false, this.n)
}

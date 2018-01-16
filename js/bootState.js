var bootState = {}

bootState.init = function () {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.stage.disableVisibilityChange = true

  // center the phaser
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true
  game.scale.refresh()
}

bootState.preload = function(){
  game.load.image('title', '../assets/scene_search/title.png')
}

bootState.create = function () {


  /*****send message to server*****/

  playerInfo.playerState = state[0]
  Client.askNewPlayer()

  /********************************/
  console.log('----bootState----') 
  game.state.start('loaderState', false, false)
}

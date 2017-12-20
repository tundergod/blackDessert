var bootState = {}

bootState.init = function () {
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

  playerInfo.playerState = 0
  Client.askNewPlayer()

  /********************************/


  bootState.bg = bootState.add.sprite(0,0,'title') 
  bootState.bg.scale.setTo(scaleX, scaleY)
  bootState.bg.alpha = 0
  bootState.add.tween(bootState.bg).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)

  console.log('----bootState----') 
  game.state.start('loaderState')
}

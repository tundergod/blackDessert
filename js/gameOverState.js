var gameOverState = {}

gameOverState.create = function(){
  console.log('----gameOverState----')   
  gameOverState.bg = gameOverState.add.sprite(0,0,'gameover')
  gameOverState.bg.scale.setTo(scaleX, scaleY)
  gameOverState.bg.onInputDown.add(gameOverState.backState, this)
}

gameOverState.backState = function(){
  game.state.start("chooseState")
}

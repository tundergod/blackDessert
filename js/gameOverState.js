var gameOverState = {}

/*
TODO:
1.game over的圖片
2.當生命>0 就進入這個state，按下gameover回到searchState
*/
gameOverState.create = function(){
  console.log('----gameOverState----')   
  gameOverState.bg = gameOverState.add.sprite(0,0,'gameover')
  gameOverState.bg.scale.setTo(scaleX, scaleY)
  gameOverState.bg.onInputDown.add(gameOverState.backState, this)
}

gameOverState.backState = function(){
  game.state.start("chooseState")
}

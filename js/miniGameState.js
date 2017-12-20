var miniGameState = {}

var numButton = 30
miniGameState.count = 0
miniGameState.button = []
miniGameState.score = 0
var style = {                                                                                                             
  font: '32px Arial',
  fill: '#ff0044',
  align: 'center',
  backgroundColor: '#ffff00'
}

miniGameState.init = function(data){
  miniGameState.data = data
}

miniGameState.create = function(){

  console.log('----miniGameState----') 

  miniGameState.bg = miniGameState.add.sprite(0, 0, 'black')
  miniGameState.bg.scale.setTo(scaleX,scaleY)
  miniGameState.bg.alpha = 0
  miniGameState.add.tween(miniGameState.bg).to({ alpha: 0.99 }, 0, Phaser.Easing.Linear.None, true)

  miniGameState.physics.startSystem(Phaser.Physics.ARCADE)
  miniGameState.physics.arcade.gravity.y = 1000
  miniGameState.time.events.repeat(Phaser.Timer.SECOND * 0.5, numButton, miniGameState.createButton)

  miniGameState.scoreText = miniGameState.add.text(10, 10, miniGameState.score, style)
  miniGameState.backText = miniGameState.add.text(width-100, 10, 'BACK', style)
  miniGameState.backText.inputEnabled = true
  miniGameState.backText.events.onInputDown.add(miniGameState.backState)
}

miniGameState.createButton = function(){
  //四個東西隨機選一個跌下來 (0 ~ 3)
  /*
  TODO:
  1.畫遊戲的frame
  2.畫遊戲的button
  3.遊戲離開button
  4,結束條件
  */
  miniGameState.random = Math.floor((Math.random() * 4))
  miniGameState.button[miniGameState.count] = miniGameState.add.sprite(0, -200, 'head1')
  miniGameState.button[miniGameState.count].scale.setTo(0.3, 0.3)
  miniGameState.button[miniGameState.count].position.x = game.world.centerX - (miniGameState.button[miniGameState.count].width*2 - 10*2) + (miniGameState.button[miniGameState.count].width * miniGameState.random + 10 * miniGameState.random)
  miniGameState.physics.enable(miniGameState.button, Phaser.Physics.ARCADE)
  miniGameState.button[miniGameState.count].body.bounce.y = 0.9
  miniGameState.button[miniGameState.count].inputEnabled = true
  miniGameState.button[miniGameState.count].events.onInputDown.add(miniGameState.boom,{n : miniGameState.count})
  miniGameState.count++
}

miniGameState.boom = function(){

  console.log('hit!')
  var boom = miniGameState.add.sprite(miniGameState.button[this.n].position.x, miniGameState.button[this.n].position.y, 'kaboom');
  var booom = boom.animations.add('booooom');
  boom.animations.play('booooom', 50, false, true);
  miniGameState.button[this.n].kill()
  miniGameState.score = miniGameState.score + 10
  miniGameState.scoreText.text = miniGameState.score
}

miniGameState.end = function(){
  console.log("haha")
}

miniGameState.backState = function(){
  game.state.start('sceneState', true, false, miniGameState.data)
}

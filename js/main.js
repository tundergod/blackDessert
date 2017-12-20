var width = $(window).width() * 0.9
var height = $(window).height() * 0.9
var game = new Phaser.Game(width, height, Phaser.AUTO, document.getElementById('game'), {})

// define screen scale
var scaleX = width/1920
var scaleY = height/1080
console.log(width,height,scaleX,scaleY)

// state define
game.state.add('bootState', bootState)
game.state.add('loaderState', loaderState)
game.state.add('loginState', loginState)
game.state.add('searchState', searchState)
game.state.add('chooseState', chooseState)
game.state.add('mapState', mapState)
game.state.add('sceneState', sceneState)
game.state.add('miniGameState', miniGameState)
game.state.add('gameOverState', gameOverState)


// global variable define
var heroNum = 10
var scenesPic = ['castle', 'forest', 'town', 'lake', 'cave']
var hero = []
/*
playerState:
  1.bootState
  2.loaderState
  3.loginState
  4.searchState
  5.chooseState
  6.mapState
  7.sceneState
  8.miniGameState
  9.gameOverState
*/
var playerInfo = {                                                                                                        
  "userID":"",
  "playerState":"", 
  "heroChoose":"",
  "heroState":{
    "hp":"100", // maximum=100 <--- minimum=0
    "state":"", // fighting=2,searching=1,nothing=0
    "locate":"", // map=0,castle=1,forest=2,lake=3,t  own=4,cave=5
    "search":"", // no=0 , yes=1
    "searched":{
      "enermy":"0",
      "fight":""
    }
  } 
}

// game start
game.state.start('bootState')

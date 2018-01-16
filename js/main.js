var width = $(window).width()
var height = $(window).height()
var game = new Phaser.Game(width, height, Phaser.CANVAS, document.getElementById('game'), {})

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
game.state.add('winState', winState)


// global variable define
var heroNum = 10
var scenesPic = ['castle', 'forest', 'town', 'lake', 'cave']
var hero = ['druid', 'knight', 'nun', 'sniper', 'ninja', 'warrior', 'fairy', 'swordman', 'poet', 'assassin']
var state = ['bootState', 'loaderState', 'loginState', 'searchState', 'chooseState', 'mapState', 'sceneState', 'miniGameState', 'gameOverState', 'winState']

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
  "userName":"",
  "playerState":"",
  "heroChoose":"",
  "heroState":{
    "maxhp":"",
    "hp":"", // maximum=100 <--- minimum=0
    "atk":"",
    "def":"",
    "counterPercent":"",
    "item":[],
    "equip":[],
    "skill":"", //1 = use
    "locate":"", // map=0, castle=1, forest=2, lake=3, town=4, cave=5
    "search":"0", // plyaer press search? no=0 , yes=1
    "searched":{
      "found":"0",
      "enermy":"0", //no enermy = 0, got enermy = enermy userID。 對手是誰
      "fight":"0", //if searched an enermy, fight = 1
      "fighted":"0", //if someone searched player and fight him, = 1, else = 0
      "counter":"0"
    }
  } 
}

startTimer = function(){
  timerText = game.add.text(game.world.centerX, 10, '', {font: "32px Arial", fill: "#fff"})
  timerText.anchor.setTo(0.5, 0)

}
var time, min, sec, result
updateTimer =  function(){

  var timeCurrent = new Date()
  time = Math.round((timeCurrent.getTime() - chooseState.timeStart) / 1000);
  min = Math.floor(time / 60)
  sec = time % 60
  result = (min < 10) ? "0" + min : min;
  result += (sec < 10) ? ":0" + sec : ":" + sec;
  return result
//  timerText.text = result;
}

// game start
game.state.start('bootState')

/*
Phaser.io 遊戲主程式
*/
var Game = {}
var input1 = new CanvasInput({
  canvas: document.getElementById('username'),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 150,
  height:30,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'your username'
});

var input2 = new CanvasInput({
  canvas: document.getElementById('password'),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 150,
  height:30,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'your password' 
});

var resizeGame = function () { 
  var height = window.innerHeight;
  var width = window.innerWidth;
      
  game.width = width;
  game.height = height;
  game.stage.bounds.width = width;
  game.stage.bounds.height = height;
               
  if (game.renderType === 1) {
    game.renderer.resize(width, height);
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
  }
}

Game.init = function () {
  game.stage.disableVisibilityChange = true
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();
}

Game.preload = function () {

}

Game.create = function () {
  // 出發Client.askNewPlayer事件 -> client.js
  Client.askNewPlayer()
}

Game.update = function(){
}

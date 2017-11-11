/*
Phaser.io 遊戲主程式
*/
var Game = {}

Game.init = function () {
  game.stage.disableVisibilityChange = true
}

Game.preload = function () {

}

Game.create = function () {
  // 出發Client.askNewPlayer事件 -> client.js
  Client.askNewPlayer()
  trytry.hi()
}

var width = $(window).width() * 0.9;
var height = $(window).height() * 0.9;
var game = new Phaser.Game(width, height, Phaser.AUTO, document.getElementById('game'),{})
game.state.add('Game', Game)
game.state.start('Game')

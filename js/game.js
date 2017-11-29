/*
Phaser.io 遊戲主程式
*/
var Game = {}

// button
var titleAnimate
var startButton

// actor
var actor = ['assassin', 'bard', 'ninja', 'sniper', 'swordman']
var assassin
var bard
var ninja
var sniper
var swordman

// background
var bg

// text
var text1
var text2

// image
var map
var loc = ['map', 'castle_unchoose', 'castle_choose', 'forest_unchoose', 'forest_choose', 'lake_cunhoose', 'lake_choose', 'town_unchoose', 'town_choose', 'cave_unchoose', 'cave_choose']

// canvas input for login - username and password
var input1 = new CanvasInput({
  canvas: document.getElementById('username'),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 150,
  height: 30,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'your username'
})

var input2 = new CanvasInput({
  canvas: document.getElementById('password'),
  fontSize: 16,
  fontFamily: 'Arial',
  fontColor: '#212121',
  fontWeight: 'bold',
  width: 150,
  height: 30,
  padding: 8,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 3,
  boxShadow: '1px 1px 0px #fff',
  innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  placeHolder: 'your password'
})

Game.init = function () {
  game.stage.disableVisibilityChange = true

  // center the phaser
  game.scale.pageAlignHorizontally = true
  game.scale.pageAlignVertically = true
  game.scale.refresh()
}

Game.preload = function () {
  // actor
  game.load.image('assassin', '../assets/actor/assassin.png')
  game.load.image('bard', '../assets/actor/bard.png')
  game.load.image('ninja', '../assets/actor/ninja.png')
  game.load.image('sniper', '../assets/actor/sniper.png')
  game.load.image('swordman', '../assets/actor/swordman.png')

  // map
  game.load.image('map', '../assets/scene_choose/map.png')
  game.load.image('title', '../assets/scene_choose/title.png')
  game.load.image('map_back', '../assets/scene_choose/map_back.png')
  game.load.image('castle_choose', '../assets/scene_choose/castle_choose.png')
  game.load.image('castle_unchoose', '../assets/scene_choose/castle_unchoose.png')
  game.load.image('forest_choose', '../assets/scene_choose/forest_choose.png')
  game.load.image('forest_unchoose', '../assets/scene_choose/forest_unchoose.png')
  game.load.image('town_choose', '../assets/scene_choose/town_choose.png')
  game.load.image('town_unchoose', '../assets/scene_choose/town_unchoose.png')
  game.load.image('lake_choose', '../assets/scene_choose/lake_choose.png')
  game.load.image('lake_unchoose', '../assets/scene_choose/lake_unchoose.png')
  game.load.image('cave_choose', '../assets/scene_choose/cave_choose.png')
  game.load.image('cave_unchoose', '../assets/scene_choose/cave_unchoose.png')

  // button
  game.load.image('HP_bar', '../assets/scene_search/HP_bar.png')
  game.load.image('HP_text', '../assets/scene_search/HP_text.png')
  game.load.image('ninja_skill_icon', '../assets/scene_search/ninja_skill_icon.png')
  game.load.image('walk_button', '../assets/scene_search/walk_button.png')
  game.load.image('HP_frame', '../assets/scene_search/HP_frame.png')
  game.load.image('attack_button', '../assets/scene_search/attack_button.png')
  game.load.image('skill_button', '../assets/scene_search/skill_button.png')
}
Game.create = function () {
  // 出發Client.askNewPlayer事件 -> client.js
  Client.askNewPlayer()

  // set background
  game.stage.backgroundColor = '#000000'
  bg = game.add.sprite(0, 0, 'map_back')
  bg.width = width
  bg.height = height
  bg.alpha = 0
  game.add.tween(bg).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true)

  // title fadeiin
  titleAnimate = game.add.sprite(game.world.centerX, game.world.centerY, 'title')
  titleAnimate.width = width * 0.8
  titleAnimate.height = height * 0.8
  titleAnimate.anchor.setTo(0.5, 0.6)
  titleAnimate.alpha = 0
  game.add.tween(titleAnimate).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)

  // start game button
  startButton = game.add.button(game.world.centerX, game.world.centerY, 'walk_button', pressStart)
  startButton.scale.setTo(0.4, 0.4)
  startButton.anchor.setTo(0.5, -0.5)
  startButton.alpha = 0
  game.add.tween(startButton).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)

  cursors = game.input.keyboard.createCursorKeys()
}

Game.update = function () {
  //  This allows us to move the game camera using the keyboard

  if (cursors.left.isDown) {
    game.camera.x -= 2
  } else if (cursors.right.isDown) {
    game.camera.x += 2
  }

  if (cursors.up.isDown) {
    game.camera.y -= 2
  } else if (cursors.down.isDown) {
    game.camera.y += 2
  }
}

Game.render = function () {
  game.debug.inputInfo(16, 16)
}

function pressStart () {
  console.log('pressed start')

  // invisible button and title
  startButton.destroy()
  titleAnimate.destroy()

  // choose actor
  var positionX = 0
  var style = {
    font: '32px Arial',
    fill: '#ff0044',
    align: 'center',
    backgroundColor: '#ffff00'
  }

  text1 = game.add.text(10, 10, 'Choose Hero~~~~', style)

  var fadeInTime = 500

  for (let i = 0; i < 5; i++) {
    // add sprite
    actor[i] = game.add.sprite(positionX, 150, actor[i])
    actor[i].width = width / 5
    actor[i].height = height / 2

    // fadein
    actor[i].alpha = 0
    game.add.tween(actor[i]).to({ alpha: 1 }, fadeInTime, Phaser.Easing.Linear.None, true)
    positionX += width / 5
    fadeInTime += 500

    // input enable (click)
    actor[i].inputEnabled = true
    actor[i].events.onInputDown.add(heroSelect, {param: actor[i]})
  }
}

function heroSelect () {
  text1.text = 'Choose Hero, you choose ' + this.param.key

  var style = {
    font: '32px Arial',
    fill: '#ff0044',
    align: 'center',
    backgroundColor: '#ffff00'
  }

  text2 = game.add.text(10, height - 50, 'Click me to start game', style)
  text2.inputEnabled = true
  text2.events.onInputDown.add(startGame)
}

function startGame () {
  // destroy all image
  for (let i = 0; i < 5; i++) {
    actor[i].destroy()
  }
  text1.destroy()
  text2.destroy()

  // load map
  map = game.add.sprite(0, 0, 'map')
  map.width = width
  map.height = height

  // load location
  loc[1] = game.add.sprite(game.world.centerX, game.world.centerY, loc[1])
  loc[1].scale.setTo(1, 1)
  loc[1].anchor.setTo(0.4, 0.8)
  loc[1].inputEnabled = true
  // hover
  loc[1].events.onInputOver.add(inn, this)
  loc[1].events.onInputOut.add(out, this)
  // loc[1].events.onInputDown.add(wahaha, this);
  loc[1].input.enableDrag()
}

function inn () {
  loc[1].loadTexture(loc[2], 0)
}

function out () {
  loc[1].loadTexture('castle_unchoose', 0)
}

// inside loc
function wahaha () {
  map.destroy()
  loc[1].destroy()
  bg.destroy()
}

/*
Phaser.io 遊戲主程式
*/
var Game = {}

// button
var titleAnimate
var startButton
var style = {
    font: '32px Arial',
    fill: '#ff0044',
    align: 'center',
    backgroundColor: '#ffff00'
}

// actor
var locc = []
var actor = ['assassin', 'bard', 'ninja', 'sniper', 'swordman']
var assassin
var bard
var ninja
var sniper
var swordman
var text3

//info
var playerInfo = {
  "username":"",
  "playerState":"", //login=0,chooseHero=1,inGame=2
  "heroChoose":"",
  "heroState":{
    "hp":"100", // maximum=100 <--- minimum=0
    "skill":"", // false=0,true=1
    "state":"", // fighting=2,searching=1,nothing=0
    "locate":"", // map=0,castle=1,forest=2,lake=3,t  own=4,cave=5
    "search":"", // no=0 , yes=1
    "equiment":{
      "weapon":"",
      "armor":""
    },
    "material":"",
    "from":""
  }
}

// background
var bg

// text
var text1
var text2

// image
var map

var textChooseHero, textComfirm

var search, fight, hero, skill, hpFrame, scene, hp
var loc = [
  'castle_choose', 
  'castle_choose2', 
  'forest_choose', 
  'forest_choose2', 
  'lake_choose', 
  'lake_choose2', 
  'town_choose', 
  'town_choose2', 
  'cave_choose', 
  'cave_choose2'
]

var scenes = [
  "castle",
  "forest",
  "lake",
  "town",
  "cave"
]

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
  game.load.image('title', '../assets/scene_search/title.png')
  game.load.image('pressStart', '../assets/scene_search/press_to_start.png')
  game.load.image('background', '../assets/scene_choose/map_back.png')
  game.load.image('castle_choose2', '../assets/scene_choose/castle_choose.png')
  game.load.image('castle_choose', '../assets/scene_choose/castle_unchoose.png')
  game.load.image('1', '../assets/scene_choose/castle_unchoose.png')
  game.load.image('forest_choose2', '../assets/scene_choose/forest_choose.png')
  game.load.image('forest_choose', '../assets/scene_choose/forest_unchoose.png')
  game.load.image('3', '../assets/scene_choose/forest_unchoose.png')
  game.load.image('town_choose2', '../assets/scene_choose/town_choose.png')
  game.load.image('town_choose', '../assets/scene_choose/town_unchoose.png')
  game.load.image('7', '../assets/scene_choose/town_unchoose.png')
  game.load.image('lake_choose2', '../assets/scene_choose/lake_choose.png')
  game.load.image('lake_choose', '../assets/scene_choose/lake_unchoose.png')
  game.load.image('5', '../assets/scene_choose/lake_unchoose.png')
  game.load.image('cave_choose2', '../assets/scene_choose/cave_choose.png')
  game.load.image('cave_choose', '../assets/scene_choose/cave_unchoose.png')
  game.load.image('9', '../assets/scene_choose/cave_unchoose.png')

  // button
  game.load.image('HP_bar', '../assets/scene_search/HP_bar.png')
  game.load.image('HP_text', '../assets/scene_search/HP_text.png')
  game.load.image('ninja_skill_icon', '../assets/scene_search/ninja_skill_icon.png')
  game.load.image('walk_button', '../assets/scene_search/walk_button.png')
  game.load.image('HP_frame', '../assets/scene_search/HP_frame.png')
  game.load.image('attack_button', '../assets/scene_search/attack_button.png')
  game.load.image('skill_button', '../assets/scene_search/skill_button.png')

  //location
  game.load.image('forest', '../assets/scene_search/Map_Forest.png')
  game.load.image('lake', '../assets/scene_search/Map_Forest.png')
  game.load.image('castle', '../assets/scene_search/Map_Forest.png')
  game.load.image('town', '../assets/scene_search/Map_Forest.png')
  game.load.image('cave', '../assets/scene_search/Map_Forest.png')
}

Game.create = function () {

/***************************************************************/
  // 出發Client.askNewPlayer事件 -> client.js
  // 向server發出登入通知
  // get id
  playerInfo.playerState = 0 //login
  playerInfo.from = 'create'
  Client.askNewPlayer()
  Client.sendUpdateInfo()
/***************************************************************/

  // add screen shake plugin
  game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);

  // set background
  bg = game.add.sprite(0, 0, 'background')
  bg.width = width
  bg.height = height
  bg.alpha = 0
  game.add.tween(bg).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true)

  // title fadein
  title = game.add.sprite(0, 0, 'title')
  title.width = width
  title.height = height
  title.alpha = 0
  game.add.tween(title).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)

  // title clickable -> choose hero
  title.inputEnabled = true
  title.events.onInputDown.add(chooseHero)

  // start game button(press to start)
  // animation -> blink
  startButton = game.add.sprite(game.world.centerX, game.world.centerY, 'pressStart');
  startButton.scale.setTo(1.0, 0.6)
  startButton.anchor.setTo(0.5, -4.0)
  startButton.alpha = 0
  game.add.tween(startButton).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

Game.update = function () {
  if(playerInfo.heroState.hp == 0){
    var gameover = game.add.sprite(0,0,'title')
    gameover.height = height
    gameover.width = width

    var style1 = {
      font: '150px Arial',
      fill: '#ff0044',
      align: 'center',
      backgroundColor: 'blue'
}
    var textGameover = game.add.text(0,0,'GAME OVER',style1)
  }
}

Game.render = function () {
  game.debug.inputInfo(16, 16)
}

function chooseHero () {

/***************************************************************/
  playerInfo.playerState = 1
  playerInfo.from = 'choosehero'
  Client.sendUpdateInfo()
/***************************************************************/

  // destroy button and title
  startButton.destroy()
  title.destroy()

  // choose actor
  var positionX = 0

  textChooseHero = game.add.text(game.world.centerX, 20, 'Choose Hero', style)
  textChooseHero.anchor.setTo(0.5,0) 
  var fadeInTime = 500

  for (let i = 0; i < 5; i++) {
    // add all hero sprite 
    actor[i] = game.add.sprite(positionX, 150, actor[i])
    actor[i].scale.setTo(0.4, 0.4)

    // fadein animation
    actor[i].alpha = 0
    game.add.tween(actor[i]).to({ alpha: 1 }, fadeInTime, Phaser.Easing.Linear.None, true)

    positionX += width / 5
    fadeInTime += 500

    // input enable (click)
    actor[i].inputEnabled = true
    actor[i].events.onInputDown.add(heroSelect, {param: actor[i]})
  }

  textComfirm = game.add.text(game.world.centerX, height - 100, 'START', style)
  textComfirm.anchor.setTo(0.5,0)
  textComfirm.visible = false

}
/*
Game.sendUpdate = function(){
  Client.sendUpdateInfo(playerInfo)
}
*/

function heroSelect () {

//  Game.sendUpdate()
  textComfirm.visible = true
  textChooseHero.text = 'Choose Hero, you choose ' + this.param.key
  textComfirm.inputEnabled = true

  // start game
  if(textComfirm.events.onInputDown.add(startGameInit)){
    playerInfo.heroChoose = this.param.key
  }
}

var textScene
// all object will create in startGameInit function
function startGameInit(){


/****init***********************************************************/
  playerInfo.playerState = 2 //inGame
  playerInfo.heroState.skill = 1
  playerInfo.heroState.state = 0
  playerInfo.from = 'init'
  Client.sendUpdateInfo()

/***************************************************************/

  console.log("init")
  // check hero selected
  console.log("hero = " + playerInfo.heroChoose)

  // destroy item not use anymore
  textComfirm.destroy()
  textChooseHero.destroy()
  for (let i = 0; i < 5; i++) {
    actor[i].destroy()
  }

  // load map
  map = game.add.sprite(0,0,'map')
  map.width = width
  map.height = height

  //load scene
  scene = game.add.sprite(0,0)

  // load location
  for(let i = 0; i < 5; i++){
    locc[i] = game.add.sprite(game.world.centerX, game.world.centerY)
    locc[i].scale.setTo(1,1)
    locc[i].inputEnabled = true
  }

  // load scene
  text3 = game.add.text(width - 200, 10,"")
  textScene = game.add.text(game.world.centerX,100,'')
  fight = game.add.sprite(0,0)
  search = game.add.sprite(0,0)
  hero = game.add.sprite(0,0)
  hp = game.add.sprite(0,0)
  skill = game.add.sprite(0,0)
  hpFrame = game.add.sprite(0,0)

  startGame()
}


var check = 0 

function startGame () {
  check = 0
/************************************************************/
  // in map 
  playerInfo.heroState.locate = 'map'
  playerInfo.from = 'start'
  Client.sendUpdateInfo()

/************************************************************/

  map.loadTexture("map")
  scene.loadTexture()
  fight.loadTexture()
  search.loadTexture()
  hero.loadTexture()
  skill.loadTexture()
  hp.loadTexture()
  hpFrame.loadTexture()
  text3.text = ""
  textScene.text = ''

  var j = 0
  for(let i = 0; i < 10 ; i+=2){
    //revive image
    locc[j].revive()
    locc[j].loadTexture(loc[i])

      //hover
      locc[j].events.onInputOver.add(inhover, {vali:i,valj:j})
      locc[j].events.onInputOut.add(outhover, {vali:i,valj:j})

      //click
      //locc[j].events.onInputDown.add(inScenes, {valj:j});
      locc[j].events.onInputDown.add(goInScenes, {valj:j});
      j++
  }

  locc[0].anchor.setTo(0.4, 0.8)
  locc[1].anchor.setTo(2.15, 1.0)
  locc[2].anchor.setTo(-0.7, -0.2)
  locc[3].anchor.setTo(-0.7,1.3)
  locc[4].anchor.setTo(3.2, -0.6)
}

function inhover () {
  locc[this.valj].loadTexture()
  locc[this.valj].loadTexture(loc[this.vali + 1])
}

function outhover () {
  locc[this.valj].loadTexture()
  locc[this.valj].loadTexture(loc[this.vali])
}

function goInScenes(){
  playerInfo.heroState.locate = scenes[this.valj] //scene
  playerInfo.from = 'scene'
  if(check == 0){
    Client.sendUpdateInfo()
    check = 1
  }
  inScenes(this.valj)
}

function inScenes (val) {

  scene.loadTexture(scenes[val])
  map.loadTexture()
  textScene.text = scenes[val]
  textScene.anchor.setTo(0.5,0)

  for(let i = 0 ; i <5; i++ ){
    locc[i].kill()
    locc[i].loadTexture()
  }

  search.loadTexture('walk_button')
  search.scale.setTo(0.8,0.8)
  search.anchor.setTo(-5.3,-2.2)
  search.inputEnabled = true
  search.events.onInputDown.add(shake);
  

  fight.loadTexture("attack_button")
  fight.scale.setTo(0.8,0.8)
  fight.anchor.setTo(-6.5,-4)

  text3.text = 'BACK'
  text3.inputEnabled = true
  text3.events.onInputDown.add(startGame);

  hero.loadTexture(playerInfo.heroChoose)
  hero.scale.setTo(0.7,0.7)
  hero.anchor.setTo(0,-0.3)
  
  //skill.loadTexture(playerInfo.heroChoose +"_skill_icon")
  skill.loadTexture("ninja_skill_icon")
  skill.scale.setTo(0.7,0.7)
  skill.position.x = skill.width/2
  skill.position.y = height - skill.height * 1.5

  hp.loadTexture('HP_bar')
  hp.scale.setTo(0.8,0.8)
  hp.position.x = skill.width * 1.5
  hp.position.y = height  - skill.height * 1.3

  hpFrame.loadTexture('HP_frame')
  hpFrame.scale.setTo(0.8,0.8)
  hpFrame.position.x = skill.width * 1.5
  hpFrame.position.y = height  - skill.height * 1.3
}

function shake() {
  game.plugins.screenShake.shake(30);
  playerInfo.heroState.search = 1
  Client.sendUpdateInfo()
  playerInfo.heroState.search = 0
}


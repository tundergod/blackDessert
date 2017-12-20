var chooseState = {}

chooseState.count = 0
chooseState.head = []

chooseState.create = function () {

  console.log('----chooseState----') 

/*****send message to server*****/

    playerInfo.playerState = 4
    Client.sendUpdateInfo()

/********************************/

  // add frame
  chooseState.frame = chooseState.add.sprite(0,0,'chooseFrame')
  chooseState.frame.scale.setTo(scaleX,scaleY)
  chooseState.frame.position.x = game.world.centerX - (chooseState.frame.width / 2)
  chooseState.frame.position.y = game.world.centerY - (chooseState.frame.height / 2)

  // add button
  chooseState.button = chooseState.add.sprite(0,0,'chooseButton')
  chooseState.button.scale.setTo(scaleX,scaleY)
  chooseState.button.position.x = chooseState.frame.position.x + chooseState.frame.width - chooseState.button.width * 1.5
  chooseState.button.position.y = chooseState.frame.position.y + chooseState.frame.height - chooseState.button.height * 2.5


  // add hero name
  chooseState.heroName = chooseState.add.sprite(0,0,'chooseHeroName')
  chooseState.heroName.scale.setTo(scaleX,scaleY)
  chooseState.heroName.position.x = game.world.centerX - (chooseState.heroName.width / 2)
  chooseState.heroName.position.y = chooseState.frame.position.y

  // add text
  var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: chooseState.heroName.width, align: "center", backgroundColor: "#ffff00" };
  chooseState.titleName = chooseState.add.text(0,0,'HERO',style)
  chooseState.titleName.anchor.set(0.5);
  chooseState.titleName.x = Math.floor(chooseState.heroName.x + chooseState.heroName.width / 2);
  chooseState.titleName.y = Math.floor(chooseState.heroName.y + chooseState.heroName.height / 2);

  // background and open physics
  chooseState.stage.backgroundColor = '#000000'
  chooseState.physics.startSystem(Phaser.Physics.ARCADE)
  chooseState.physics.arcade.gravity.y = 150
  //chooseState.physics.arcade.gravity.x = 20
  chooseState.time.events.repeat(Phaser.Timer.SECOND * 0.5, 10, chooseState.createHeroHead)
}

chooseState.createHeroHead = function () {
  chooseState.head[chooseState.count] = chooseState.add.sprite((width / heroNum) * (chooseState.count), -100, 'head' + (chooseState.count + 1))
  chooseState.head[chooseState.count].scale.setTo(0.2, 0.2)
  chooseState.physics.enable(chooseState.head[chooseState.count], Phaser.Physics.ARCADE)
  chooseState.head[chooseState.count].body.bounce.y = 0.9
  chooseState.head[chooseState.count].body.collideWorldBounds = true
  chooseState.head[chooseState.count].inputEnabled = true
  chooseState.head[chooseState.count].events.onInputDown.add(chooseState.heroInfo,{n:chooseState.count})
  chooseState.count++
}

chooseState.heroInfo = function(){
  // hero varaible -> this.n
  /*
  TODO:
  1.把圖片的名字弄好==
  2.把hero的名字放進框框(用chooseState.heroName.text = '')
  3.把10個hero的圖片加進去
  */
  chooseState.titleName.text = 'HERO ' + this.n
  chooseState.button.inputEnabled = true
  chooseState.button.events.onInputDown.add(chooseState.nextState,)
}

chooseState.nextState = function(){
  game.state.start('mapState')
}

var loaderState = {}

loaderState.init = function(){
  var style = { font: "32px Arial", fill: "white", wordWrap: false, align: "center" }; 
  loaderState.progressText = game.add.text(game.world.centerX,game.world.centerY + 100,'Loading 0%', style);
  loaderState.progressText.anchor.setTo(0.5,-0.3);
}

loaderState.preload = function(){

  // load actor                                                                                                                
  game.load.image('assassin', '../assets/actor/assassin.png')
  game.load.image('bard', '../assets/actor/bard.png')
  game.load.image('ninja', '../assets/actor/ninja.png')
  game.load.image('sniper', '../assets/actor/sniper.png')
  game.load.image('swordman', '../assets/actor/swordman.png')

  // laod map and scene
  game.load.image('map', '../assets/scene_choose/map.png')
  game.load.image('castle', '../assets/scene_choose/castle_unchoose.png')
  game.load.image('forest', '../assets/scene_choose/forest_unchoose.png')
  game.load.image('town', '../assets/scene_choose/town_unchoose.png')
  game.load.image('lake', '../assets/scene_choose/lake_unchoose.png')
  game.load.image('cave', '../assets/scene_choose/cave_unchoose.png')

  // load button
  game.load.image('HP_bar', '../assets/scene_search/HP_bar.png')
  game.load.image('HP_text', '../assets/scene_search/HP_text.png')
  game.load.image('skillButton', '../assets/scene_search/ninja_skill_icon.png')
  game.load.image('walkButton', '../assets/scene_search/walk_button.png')
  game.load.image('HP_frame', '../assets/scene_search/HP_frame.png')
  game.load.image('attackButton', '../assets/scene_search/attack_button.png')
  game.load.image('skillFrame', '../assets/scene_search/skill_button.png')

  // load scenec background
  game.load.image('forestBG', '../assets/scene_search/Map_Forest.png')
  game.load.image('lakeBG', '../assets/scene_search/Map_Forest.png')
  game.load.image('castleBG', '../assets/scene_search/Map_Forest.png')
  game.load.image('townBG', '../assets/scene_search/Map_Forest.png')
  game.load.image('caveBG', '../assets/scene_search/Map_Forest.png')

  // load head
  game.load.image('head1','../assets/scene_class/class_command_1.png')
  game.load.image('head2','../assets/scene_class/class_command_2.png')
  game.load.image('head3','../assets/scene_class/class_command_3.png')
  game.load.image('head4','../assets/scene_class/class_command_4.png')
  game.load.image('head5','../assets/scene_class/class_command_5.png')
  game.load.image('head6','../assets/scene_class/class_command_6.png')
  game.load.image('head7','../assets/scene_class/class_command_7.png')
  game.load.image('head8','../assets/scene_class/class_command_8.png')
  game.load.image('head9','../assets/scene_class/class_command_9.png')
  game.load.image('head10','../assets/scene_class/class_command_10.png')

  // load other
  game.load.image('background', '../assets/scene_choose/map_back.png')
  game.load.image('pressStart', '../assets/scene_search/press_to_start.png')
  game.load.image('chooseButton','../assets/scene_class/enter_command.png')
  game.load.image('chooseFrame','../assets/scene_class/class_window.png')
  game.load.image('chooseHeroName','../assets/scene_class/class_name_window.png')
  game.load.image('black','../assets/black.jpg')
  game.load.spritesheet('kaboom','../assets/explode.png', 128,128)

  game.load.onFileComplete.add(function(progress){
    loaderState.progressText.text = 'loading ' + progress + '%';
    if(progress === 100){
      loaderState.progressText.text = ''
    }
  });

  game.load.start();
}

loaderState.create = function(){

  /*****send message to server*****/

    playerInfo.playerState = 2
    Client.sendUpdateInfo()

  /********************************/


  // if load progress complete
  //game.state.start('mapState',true,false,'1')
  loaderState.bg = bootState.add.sprite(0,0,'title') 
  loaderState.bg.scale.setTo(scaleX, scaleY)
  loaderState.bg.alpha = 0
  loaderState.add.tween(loaderState.bg).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true)
  loaderState.bg.inputEnabled = true
  loaderState.bg.events.onInputUp.add(loaderState.nextState)

  loaderState.start = loaderState.add.sprite(game.world.centerX, game.world.centerY, 'pressStart');
  loaderState.start.scale.setTo(scaleX,scaleY)
  loaderState.start.anchor.setTo(0.5, -3.2)
  loaderState.start.alpha = 0
  loaderState.add.tween(loaderState.start).to( { alpha: 0.99 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, true);

  console.log('----loaderState----')
}


loaderState.nextState = function(){
  game.state.start('loginState')  
}

var loginState = {}
var accInfo=[];
loginState.init = function(){
  this.game.PhaserInput = this.game.plugins.add(PhaserInput.Plugin);
}

loginState.create = function(){
/*
TODO: 
1.login : player login with username (with db)
2.register : player register (with db)
3.assign an specific id to each player (for authentication and play game)
*/
  //login window
  loginState.window_login = loginState.add.sprite(0,0,'window_login') 
  loginState.window_login.scale.setTo(scaleX, scaleY)
  loginState.window_login.position.x = game.world.centerX - loginState.window_login.width/2
  loginState.window_login.position.y = game.world.centerY - loginState.window_login.height/2

  //register window
  loginState.window_register = loginState.add.sprite(0,0,'window_register') 
  loginState.window_register.scale.setTo(scaleX, scaleY)
  loginState.window_register.position.x = game.world.centerX - loginState.window_register.width/2
  loginState.window_register.position.y = game.world.centerY - loginState.window_register.height/2
  loginState.window_register.visible = false;

  //login button
  loginState.button_login = loginState.add.sprite(0,0,'button_login') 
  loginState.button_login.scale.setTo(scaleX, scaleY)
  loginState.button_login.position.x = game.world.centerX + loginState.button_login.width*0.2
  loginState.button_login.position.y = game.world.centerY + loginState.button_login.height*1.3
  loginState.button_login.events.onInputDown.add(loginState.checkLogin, this)
  loginState.button_login.inputEnabled = true;
  loginState.button_login.input.useHandCursor = true;                                                                                                                           
  //loginState.button_login.visible = false

  //register button
  loginState.button_register = loginState.add.sprite(0,0,'button_register') 
  loginState.button_register.scale.setTo(scaleX, scaleY)
  loginState.button_register.position.x = game.world.centerX - loginState.button_register.width*1.2
  loginState.button_register.position.y = game.world.centerY + loginState.button_register.height*1.3
  loginState.button_register.events.onInputDown.add(loginState.changeToRegister, this)
  loginState.button_register.inputEnabled = true;
  loginState.button_register.input.useHandCursor = true;                                                                                                                           

  //sql_register button
  loginState.button_sql_register = loginState.add.sprite(0, 0, 'button_register')
  loginState.button_sql_register.scale.setTo(scaleX, scaleY)
  loginState.button_sql_register.position.x = loginState.button_login.position.x
  loginState.button_sql_register.position.y = loginState.button_login.position.y
  loginState.button_sql_register.visible = false;
  loginState.button_sql_register.inputEnabled = true;
  loginState.button_sql_register.events.onInputDown.add(loginState.sqlRegister, this)

  //cancel_button
  loginState.button_cancel = loginState.add.sprite(0,0,'button_cancel') 
  loginState.button_cancel.scale.setTo(scaleX, scaleY)
  loginState.button_cancel.position.x = game.world.centerX - loginState.button_cancel.width*1.2
  loginState.button_cancel.position.y = game.world.centerY + loginState.button_cancel.height*1.3
  loginState.button_cancel.events.onInputDown.add(loginState.changeToRegister, this)
  loginState.button_cancel.inputEnabled = true;
  loginState.button_cancel.events.onInputDown.add(loginState.cancelRegister, this)
  loginState.button_cancel.events.useHandCursor = true;
  loginState.button_cancel.visible = false;

  loginState.incorrect = game.add.text(game.world.centerX - loginState.button_register.width*0.55, game.world.centerY + loginState.button_register.height*2.5, 'Your username or password incorrect!', {
    font: '18px Arial',
    fill: '#ffffff'
  });
  loginState.incorrect.visible = false

  loginState.repeat = game.add.text(game.world.centerX - loginState.button_register.width*0.65, game.world.centerY + loginState.button_register.height*2.5, 'Username repeated or password not equal!', {
    font: '18px Arial',
    fill: '#ffffff'
  });
  loginState.repeat.visible = false

/*****send message to server*****/
  //console.log("hhhhh" + playerInfo)
  //playerInfo.playerState = state[2]
  //Client.sendUpdateInfo()

/********************************/

  console.log('----loginState----') 
    var style = {
      font: '32px Arial',
      fill: '#ff0044',
      align: 'center',
      backgroundColor: '#ffff00'
    }
  //loginState.loginButton = loginState.add.text(loginState.world.centerX, loginState.world.height*0.7, 'LOGIN', style)
  //loginState.loginButton.anchor.setTo(0.5,0.5)
  //loginState.loginButton.inputEnabled = true
  //loginState.loginButton.events.onInputDown.add(loginState.loginGame, this)
  //loginState.loginButton.events.onInputDown.add(loginState.checkLogin, this)
    
  //input username
  user = game.add.inputField(loginState.world.centerX * 0.9, loginState.world.height * 0.35, {
    font: '22px Arial',
    fill: '#ffffff',
    fillAlpha: 0,
    fontWeight: 'bold',
    //forceCase: PhaserInput.ForceCase.upper,
    width: 150,
    max: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    placeHolder: 'Username',
    //textAlign: 'center',
    zoom: false
  });
  
  //input password
  password = game.add.inputField(loginState.world.centerX * 0.9, loginState.world.height * 0.47, {
      font: '22px Arial',
      fill: '#ffffff',
      fillAlpha: 0,
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Password',
      type: PhaserInput.InputType.password,
      zoom: false
    });
  password.focusOutOnEnter = false;
  password_verify = game.add.inputField(loginState.world.centerX * 0.9, loginState.world.height * 0.53, {
      font: '22px Arial',
      fill: '#ffffff',
      fillAlpha: 0,
      fontWeight: 'bold',
      width: 150,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Password',
      type: PhaserInput.InputType.password,
      zoom: false
    });
  password_verify.visible = false
}
loginState.checkLogin = function(){
  accInfo = [user.value, password.value];
  Client.loginAcc(accInfo);
  /*game.add.text(30, 10, 'Welcome ' + user.value + '!', {
    font: '18px Arial',
    fill: '#ffffff'
  });
  game.add.text(10, 50, 'Your password is: ' + password.value, {
    font: '18px Arial',
    fill: '#ffffff'
  });*/
  loginState.loginGame();
}
loginState.sqlRegister = function(){
  if(password.value == password_verify.value){
    console.log('pas ' + password.value + ', verify ' + password_verify.value)
    accInfo = [user.value, password.value];
    Client.registerAcc(accInfo);
    loginState.cancelRegister();
    Client.socket.on('sqlRegisterFailed', function(data){
      if(data == 'repeat'){
        loginState.repeat.visible = true
      }
    })
  }
  else{
    loginState.changeToRegister();
    loginState.repeat.visible = true
  }
}
loginState.loginGame = function(){
  Client.socket.on('loginStateConfirmSocket', function(data){
    playerInfo.userName = data;
    //console.log('1-2socket = '+playerInfo.userName)                                                                                                                                                                         
    if(playerInfo.userName != ''){
      //Client.sendUpdateInfo();
      //console.log(playerInfo.userName);
      game.state.start('searchState')
    }
    else{
      loginState.incorrect.visible = true
    }
  })
}
loginState.changeToRegister = function(){
//kill,revive
  loginState.window_login.visible = false;
  loginState.button_login.visible = false;
  loginState.button_register.visible = false;
  loginState.window_register.visible = true;
  loginState.button_sql_register.visible = true;
  loginState.button_cancel.visible = true;
  user.y = loginState.world.height * 0.29
  password.y = loginState.world.height * 0.41
  password_verify.visible = true
  password.setText('')
  password_verify.setText('')
  loginState.incorrect.visible = false
  loginState.repeat.visible = false
}
loginState.cancelRegister = function(){
  loginState.window_login.visible = true;
  loginState.button_login.visible = true;
  loginState.button_register.visible = true;
  loginState.window_register.visible = false;
  loginState.button_sql_register.visible = false;
  loginState.button_cancel.visible = false;
  user.y = loginState.world.height * 0.35
  password.y = loginState.world.height * 0.47
  password_verify.visible = false
  password.setText('')
  password_verify.setText('')
}

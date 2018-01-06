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

/*****send message to server*****/

  playerInfo.playerState = state[2]
  Client.sendUpdateInfo()

/********************************/

  console.log('----loginState----') 
    var style = {
      font: '32px Arial',
      fill: '#ff0044',
      align: 'center',
      backgroundColor: '#ffff00'
    }
  loginState.loginButton = loginState.add.text(loginState.world.centerX, loginState.world.height*0.7, 'LOGIN', style)
  loginState.loginButton.anchor.setTo(0.5,0.5)
  loginState.loginButton.inputEnabled = true
  //loginState.loginButton.events.onInputDown.add(loginState.loginGame, this)
  loginState.loginButton.events.onInputDown.add(loginState.checkLogin, this)
    
  //input username
  user = game.add.inputField(loginState.world.centerX * 0.9, loginState.world.height * 0.3, {
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
    zoom: true
  });
  
  //input password
  password = game.add.inputField(loginState.world.centerX * 0.9, loginState.world.height * 0.5, {
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
      zoom: true
    });
  password.focusOutOnEnter = false;
  loginState.loginButton.inputEnabled = true;
  loginState.loginButton.input.useHandCursor = true;                                                                                                                           
}
loginState.checkLogin = function(){
  accInfo = [user.value, password.value];
  Client.loginAcc(accInfo);
  game.add.text(30, 10, 'Welcome ' + user.value + '!', {
    font: '18px Arial',
    fill: '#ffffff'
  });
  game.add.text(10, 50, 'Your password is: ' + password.value, {
    font: '18px Arial',
    fill: '#ffffff'
  });
  loginState.loginGame();
}
loginState.loginGame = function(){
  if(playerInfo.userName != "unable"){
    //Client.sendUpdateInfo();
    console.log(playerInfo.userName);
    game.state.start('searchState')
  }
}

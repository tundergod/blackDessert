var loginState = {}

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
  loginState.loginButton = loginState.add.text(loginState.world.centerX, loginState.world.centerY, 'LOGIN', style)
  loginState.loginButton.anchor.setTo(0.5,0.5)
  loginState.loginButton.inputEnabled = true
  loginState.loginButton.events.onInputDown.add(loginState.loginGame, this)
}

loginState.loginGame = function(){
  game.state.start('searchState')
}

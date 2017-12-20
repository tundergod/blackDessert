var loginState = {}

loginState.create = function(){
/*
TODO: 
1.login : player login with username (with db)
2.register : player register (with db)
3.assign an specific id to each player (for authentication and play game)
*/

/*****send message to server*****/

  playerInfo.playerState = 3
  Client.sendUpdateInfo()

/********************************/

  console.log('----loginState----') 
  game.state.start('searchState')
}

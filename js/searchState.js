var searchState = {}

searchState.create = function(){
/*
TODO : search game -> 10 player 1 room (through socket.io)
*/

/*****send message to server*****/

  playerInfo.playerState = state[3] 
  Client.sendUpdateInfo()

/********************************/

  console.log('----searchState----') 
  var style = {
    font: '32px Arial',
    fill: '#ff0044',
    align: 'center',
    backgroundColor: '#ffff00'
  }
  searchState.searchButton = searchState.add.text(searchState.world.centerX, searchState.world.centerY, 'SEARCH', style)
  searchState.searchButton.anchor.setTo(0.5,0.5)
  searchState.searchButton.inputEnabled = true
  searchState.searchButton.events.onInputDown.add(searchState.searchGame, this)
}

searchState.searchGame = function(){
  game.state.start('chooseState')
}

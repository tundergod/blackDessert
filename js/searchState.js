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
  searchState.pair_button = loginState.add.sprite(0,0,'button_pair') 
  searchState.pair_button.scale.setTo(scaleX, scaleY)                                                                                                       
  searchState.pair_button.position.x = game.world.centerX - searchState.pair_button.width/2
  searchState.pair_button.position.y = game.world.centerY - searchState.pair_button.height/2
  searchState.pair_button.inputEnabled = true
  searchState.pair_button.events.onInputDown.add(searchState.searchGame, this)
    searchState.total = game.add.text(game.world.centerX*1.1 , game.world.centerY * 1.3, '/ 10', {
    font: '22px Arial',
    fill: '#ffffff'
  });
  searchState.nowReady = game.add.text(game.world.centerX*0.9 , game.world.centerY * 1.3, '0', {
    font: '22px Arial',
    fill: '#ffffff'
  });
  Client.socket.emit('pending', 'pending_value', function(response){
    searchState.nowReady.text = response 
  })
  Client.socket.on('ready', function(data){
    searchState.nowReady.text = data
    //game time start
    //room max population
    if(data == 2){
      searchState.nextState()
      console.log(data)
    }
  })
  //.incorrect.visible = false 
}

searchState.searchGame = function(){
  Client.joining()
  searchState.waiting = game.add.text(game.world.centerX*0.9 , game.world.centerY * 1.5, 'waiting other player...', {
    font: '22px Arial',
    fill: '#ffffff'
  });
}

searchState.nextState = function(){
  console.log('choose')
  game.state.start('chooseState')
}

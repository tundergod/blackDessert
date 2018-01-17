var winState = {}

winState.create = function(){
  console.log('----gameOverState----')   
  winState.bg = winState.add.sprite(0,0,'win')
  winState.bg.scale.setTo(scaleX, scaleY)
  winState.bg.inputEnabled = true 
}

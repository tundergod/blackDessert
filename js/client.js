/*
處理每一個client的動作
*/
var Client = {}

Client.socket = io.connect()

//玩家登入網頁後對server發送請求
/* TODO: 玩家登入/注冊，是否符合權限等驗證*/
Client.askNewPlayer = function () {

  // 觸發server端newplayer函式
  Client.socket.emit('newplayer')
}

//確認已經登入
Client.socket.on('allplayers', function (data) {

  console.log("Login SUCCESS!!!!!!");
  console.log("----Players online:----\n" + JSON.stringify(data) + "\n")
})

//通知所有client有新的玩家加入
Client.socket.on('newplayers', function (data) {
  console.log("A new players JOIN the game!!!!")
})

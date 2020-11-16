const io = require("socket.io-client"); //initialisierung von dem package socket.io(client) io ist in/out und so mit die schnittstelle
const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ""
});


var socket = io.connect("http://localhost:4000");

var msg = {
  name: "default",
  message: "N/A"
}
socket.on("welcome", (data) => { //welcome = Event Name, wird aufgerufen wennverbunden mit Server
  console.log(data.welcome, "\nClient Name ist: " + data.name); //geschickte Daten(Connection und Port...) werden ausgegeben
  msg.name = "client" + data.name;
  rl.prompt = msg.name + ": ";

  rl.on('line', function (ans) {
    msg.message = ans;
    socket.emit("send-msg", msg); //Eingegebene Nachricht wird zum Server übermittelt
  });


});
socket.on("broadcast-msg", msgData => {
    console.log(msgData.name + ": " + msgData.message);
});

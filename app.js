const io = require("socket.io-client"); //initialisierung von dem package socket.io(client) io ist in/out und so mit die schnittstelle
const readline = require('readline'); //initialisierung von readline, von der stadard node.js libary
var rl = readline.createInterface({ //Eingabe Interface
  input: process.stdin,
  output: process.stdout,
  prompt: "" //Eingabe Zeichen
});


var socket = io.connect("http://localhost:4000"); //Connect Adresse

var msg = { //Struktur für eine default Nachricht
  name: "default",
  message: "N/A"
}
socket.on("welcome", (data) => { //welcome = Event Name, wird aufgerufen wennverbunden mit Server
  console.log(data.welcome, "\nClient Name ist: " + data.name); //geschickte Daten(Connection und Port...) werden ausgegeben
  msg.name = "client" + data.name;
  rl.prompt = msg.name + ": ";

  rl.on('line', function (ans) { //Eingabe funktion
    msg.message = ans;
    socket.emit("send-msg", msg); //Eingegebene Nachricht wird zum Server übermittelt
  });


});
socket.on("broadcast-msg", msgData => { //Wenn Nachricht empfangen wird
    console.log(msgData.name + ": " + msgData.message);
});

const port = 4000;
const http = require("http").createServer(); //erstellen eines Servers
const io = require("socket.io")(http); //initialisierung von dem package socket.io(allgemein)

var welcomeMsg = { //Struktur für Welcome Nachricht für jeden User. Zudem zuteilung der Bennenung der clients
  welcome: `Die Verbindung zum Server wurde erfolgreich aufgebaut! \nDu bist mit dem Port ${port} verbunden.`,
  name: 0
}

io.on("connect", (socket) => { //connect function wenn Client connected

  socket.emit("welcome", welcomeMsg); //senden einer Event nachricht mit dem Titel 'welcome'
  console.log(`New Client Nr.${welcomeMsg.name} is connected`); //Nachricht wenn Client connected ist
  welcomeMsg.name++; //zählt die variable für den namen hoch

  socket.on("send-msg", msg => { //funktion wird ausgeführt wenn eine Nachricht empfangen wird
    console.log(msg.name, ":", msg.message);

    socket.broadcast.emit("broadcast-msg", msg); //sendet zu jedem nutzer außer dem socket(client) der es gesendet hat
  });
});
http.listen(port, () => { //function wenn der server zum port 4000 connected ist
  console.log("Server is listening to the port: " + port);
});

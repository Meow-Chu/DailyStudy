var express = require("express");
var app = express();

var http = require("http");
var server = http.Server(app);

var socket = require("socket.io");
var io = socket(server);

var port = 5000;
var socketList = [];

app.use("/", function (req, resp) {
  resp.sendFile(__dirname + "/chat.html");
});

io.on("connection", function (socket) {
  socketList.push(socket);
  console.log(socketList);
  console.log("User Join");

  socket.on("SEND", function (msg) {
    console.log(msg);
  });
});

server.listen(port, function () {
  console.log("Server On !");
});

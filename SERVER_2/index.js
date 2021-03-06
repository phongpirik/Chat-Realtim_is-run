var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3333);

io.on("connection",function(socket){
	console.log('Co nguoi ket noi '+socket.id);
	socket.on("Client-send-mau",function(data){
		io.sockets.emit("Server-send-mau",data);
	})
});

app.get("/", function(req, res){
	res.render("trangchu");
});
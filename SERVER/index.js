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

	socket.on("disconnect",function(){
		console.log(socket.id+" Ngat ket noi");
	});
	socket.on("Client-send-data",function(data){
		console.log(data);
		//Truyen data cho tat ca nhung client dang connec
		io.sockets.emit("Server-send-data",data+"111");


		// Ai phat len thi phat data lai ng do
		socket.emit("Server-send-data",data+"222");


		// A gui data len server ,cac client khac
		// tren server se nhan duoc data , rieng A ko nhan
		// duoc data
		socket.broadcast.emit("Server-send-data",data+"333")
	});
});

app.get("/", function(req, res){
	res.render("trangchu");
});
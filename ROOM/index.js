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

	////liet ke cac rooms dang co tren server
	// console.log(socket.adapter.rooms);

	// Chỉ có thể join Room, chứ không tạo room
	socket.on("tao-room",function(data){
		//// tham gia room
		socket.join(data);
		socket.Phong = data;

		var mang=[];
		for(r in socket.adapter.rooms){
			mang.push(r);
		}
		io.sockets.emit("server-send-rooms",mang);
		socket.emit("server-send-room-socket",data);

		//// rời khỏi room
		// socket.left(data);
		// console.log(socket.adapter.rooms);
	});

	socket.on("user-chat",function(data){
		io.sockets.in(socket.Phong).emit("server-chat",data)
	});

	socket.on("disconnect",function(){
		console.log(socket.id+" Ngat ket noi");
	});

});

app.get("/", function(req, res){
	res.render("trangchu");
});
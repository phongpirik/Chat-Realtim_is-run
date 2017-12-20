var socket = io("http://localhost:3333");

socket.on("server-send-dk-thatbai",function(){
	alert("Sai Username : Co nguoi da dang ki");
});

socket.on("server-send-dk-thanhcong",function(data){
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
});

socket.on("server-send-danhsach-Users",function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div class='useronline'> "+ i +"</div>");
	});
});

socket.on("server-send-message",function(data){
	$("#listMessages").append("<div class='ms'>"+data.un+": "+data.nd+"</div>")
});

socket.on("dang-go",function(data){
	$("#thongbao").html(data);
});
socket.on("stop-go",function(){
	$("#thongbao").html("");
});

$(document).ready(function(){
	$("#loginForm").show();
	$("#chatForm").hide();	

	$("#btnRegister").click(function(){
		socket.emit("client-send-Username",$("#txtUsername").val());
	});

	$("#btnLogout").click(function(){
		socket.emit("logout");
		$("#loginForm").show(1000);
		$("#chatForm").hide(2000);
	});

	$("#btnSendMessage").click(function(){
		socket.emit("user-send-message",$("#txtMessage").val());
	});

	$("#txtMessage").focusin(function(){
		socket.emit("toi-dang-go-chu");
	});

	$("#txtMessage").focusout(function(){
		socket.emit("toi-stop-go-chu");
	})
});
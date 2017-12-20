var socket = io("https://phongdeptrai.herokuapp.com");

socket.on("server-gui-ds",function(data){
	$("#ds").html("");
	data.map(function(hocvien,index){
		$("#ds").append(`
			<div class='hocvien'>
				<div class='hang1'>
					<span id="span">`+hocvien.HoTen+`</span> <br>
					&nbsp&nbsp&nbsp&nbsp <span>`+hocvien.EMAIL+`</span>
				</div>
			</div>
		`);
		$('#listUsers').animate({
            scrollTop: $("#scoll").offset().top
        }, 0);
	});
});

$(document).ready(function(){
	 $(document).bind('keypress', function(e) {
            if(e.keyCode==13){
                 $('#btnRegister').trigger('click');
             }
        });
	$("#btnRegister").click(function(){
		socket.emit("hocvien-gui-thongtin",{
			hoten:$("#txtHoTen").val(),
			email:$("#txtEmail").val(),
			sdt:$("#txtSoDT").val()
		});

		$("#txtEmail").val("");
		

	});
});
// <div class='hocvien'>
// 	<div class='hang1'>
// 		id:`+index+` || 
// 		<span>`+hocvien.HoTen+`</span>
// 	</div>
// 	<div class='hang2'>
// 		`+hocvien.EMAIL+`- `+hocvien.SODT+`
// 	</div>
// 	<hr>
// </div>
//根据userId初始化
// $(function () {
//     // var userId = window.location.href.split("?")[1].split("=")[1];
// 	// var userId = <%=session.getAttribute('userCode')%>;
//     // var userId=$("#userId").val();
// 	console.log(userId);
//
//     $("#userId").value=userId;
// })

//修改密码
$("#update").bind("click",function(){
	var userId=$("#userId").val();
	var oldPwd=$("#oldPassword").val();
	var newPwd=$("#newPassword").val();
	if(confirm("确认修改密码？")){
		$.get("/user/updatePwd", {method:"updatePassword",userId:userId,oldPassword:oldPwd,newPassword:newPwd}, function(data){
			if (data.flag == false) {
				alert(data.msg);
			} else {
				alert(data.msg);
				window.location.reload();
			}
		},"text");
	}
});

//根据userId初始化
$(function () {
    var userId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        url: "/user/selectUserById",
        type:"post",
        data:{"id":userId},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var user = data.data;

            var userHtml = '<tr>\n' +
                '\t\t\t\t\t<td class="field">用户编号：</td>\n' +
                '\t\t\t\t\t<td><input type="hidden" name="userId" value="'+user.id+'">'+user.id+'</td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">用户名：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="name" class="text" id="name" value="'+user.userName+'"> <font color="red">*</font><font color="red" id="name_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">用户性别：</td>\n' +
                '\t\t\t\t\t<td><select name="gender" id="gender">'+genderFun(user.gender)+
				'\t\t\t\t\t</select></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">出生日期：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="birthDate" class="text" id="birthDate" value="'+formatTime(user.birthday)+'"> <font color="red">*</font><font color="red" id="birthDate_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">用户电话：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="phone" class="text" id="phone" value="'+user.phone+'"> <font color="red">*</font><font color="red" id="phone_span"></font></td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">用户地址：</td>\n' +
                '\t\t\t\t\t<td><input name="address" id="address" class="text" value="'+user.address+'"></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">用户权限：</td>\n' +
                '\n' +
                '\t\t\t\t\t<td>'+userTypeFun(user.userType)+'</td>\n' +
                '\t\t\t\t</tr>'

            $("#user-update").html(userHtml);
        }
    })
})

function genderFun(gender) {
	if (gender == 1) {
        return '\t\t\t\t\t\t    <option value="1" checked="">男</option>\n' + 
			'\t\t\t\t\t\t    <option value="2">女</option>\n';
	} else {
		return '\t\t\t\t\t\t    <option value="1">男</option>\n' +
            '\t\t\t\t\t\t    <option value="2" checked="">女</option>\n';
	}
}

//格式化时间戳(返回：2017-10-21 13:18:25)
function formatTime(timestamp){
    if(timestamp==null){
        return null;
    }

    var date = new Date(timestamp);

    Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate();

    if(m<10){
        m = '0'+m;
    }
    if(d<10){
        d = '0'+d;
    }

    var t = Y+'-'+m+'-'+d;
    return t;
}

function userTypeFun(userType) {
	if (userType == 1) {
		return '<input type="radio" name="userType" value="1" checked="true">管理员<input type="radio" name="userType" value="2">经理<input type="radio" name="userType" value="3">普通用户';
	} else if (userType == 2) {
        return '<input type="radio" name="userType" value="1">管理员<input type="radio" name="userType" value="2" checked="true">经理<input type="radio" name="userType" value="3">普通用户';
    } else {
        return '<input type="radio" name="userType" value="1">管理员<input type="radio" name="userType" value="2">经理<input type="radio" name="userType" value="3" checked="true">普通用户';
	}
}

var passed=true;
$("#update").bind("click",function(){
	//判断是否是数字的正则表达式
	passed=true;
	var p1 = "^\\d+$";
	if(!$("#name").val())
	{
		$("#name_span").text("请输入用户名");
		passed=false;
	}
	if(!$("#birthDate").val())
	{
		$("#birthDate_span").text("请输入出生日期");
		passed=false;
	}else{
		var pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
		if(!pattern.test($("#birthDate").val()))
		{
			$("#birthDate_span").text("请输入正确的日期格式，如1988-08-02");
			$("#birthDate").val("");
			passed=false;
		}
	}
	if(!$("#phone").val())
	{
		$("#phone_span").text("请输入电话");
		passed=false;
	}else{
		var pattern = new RegExp(p1);
		if(!pattern.test($("#phone").val()))
		{
			$("#phone_span").text("请输入正确的电话号码");
			$("#phone").val("");
			passed=false;
		}
	}
	if(passed){
		if(confirm("确认修改？"))
			$("#form1").submit();
		else
			return false;
	}
});

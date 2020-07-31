$(function(){
    var userId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        url:"/user/selectUserById",
        type:"post",
        data:{"id":userId},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var user = data.data;
            var userHtml='<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户编号：</td>\n' +
                '\t\t\t\t\t\t<td>'+user.id+'<input type="hidden" id="userId" value="'+user.id+'"></td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户名：</td>\n' +
                '\t\t\t\t\t\t<td>'+user.userName+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户账号：</td>\n' +
                '\t\t\t\t\t\t<td>'+user.userCode+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户性别：</td>\n' +
                '\t\t\t\t\t\t<td>'+genderFun(user.gender)+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">出生日期：</td>\n' +
                '\t\t\t\t\t\t<td>'+formatTime(user.birthday)+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户年龄：</td>\n' +
                '\t\t\t\t\t\t<td>'+ageFun(user.birthday)+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户电话：</td>\n' +
                '\t\t\t\t\t\t<td>'+user.phone+'</td>\n' +
                '\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户地址：</td>\n' +
                '\t\t\t\t\t\t<td>'+user.address+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">用户权限：</td>\n' +
                '\n' +
                '\t\t\t\t\t\t<td>'+userTypeFun(user.userType)+'</td>\n' +
                '\t\t\t\t\t</tr>'

            $("#user-view").html(userHtml);
        }

    })

})

function genderFun(gender) {
    if (gender == 1){
        return "男";
    } else {
        return "女";
    }
}

//根据生日计算年龄
function ageFun(birthDate) {
    if (birthDate == null){
        return null;
    }
    var birthD = new Date(birthDate);

    var birYear = birthD.getFullYear(),
        birMonth = birthD.getMonth(),
        birDay = birthD.getDate();

    d = new Date();
    var nowYear = d.getFullYear(),
        nowMonth = d.getMonth() + 1,
        nowDay = d.getDate();

    var returnAge;

    if (birthDate == null) {
        return null;
    }

    if(nowYear == birYear) {
        returnAge = 0;
    } else {
        var ageDiff = nowYear - birYear;
        if(ageDiff > 0){
            if (nowMonth == birMonth){
                var dayDiff = nowDay - birDay;
                if(dayDiff<0){
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birMonth;
                if(monthDiff<0){
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
            return returnAge;
        } else {
            return "出生日期晚于今天，数据有误";//返回-1
        }
    }
    return returnAge;
}

//用户类型
function userTypeFun(userType) {
    if (userType == 1) {
        return "管理员";
    } else if (userType == 2) {
        return "经理";
    } else if (userType == 3) {
        return "普通员工";
    }
    return null;
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

//跳转修改页面
$("#update").bind("click",function(){
	var userId=$("#userId").val();
	window.location.href="userUpdate.html?userId="+userId;
});
//删除
$("#del").bind("click",function(){
    var userId=$("#userId").val();
		if(confirm("确认删除？")){
            $.ajax({
                url:"/user/delete",
                type:"post",
                data:{"userId":userId},
                dateType:"json",
                success:function (data) {
                    if (data.flag == false) {
                        alert("删除用户失败");
                        window.location.reload();
                    } else {
                        alert("删除用户成功");
                        window.location.href="userList.html";
                    }

                }
            })
		}
});
//重置密码
$("#repassword").bind("click",function(){
	var userId=$("#userId").val();
	if(confirm("确认重置密码？")){
	    $.ajax({
            url:"/user/rePassword",
            type:"post",
            data:{"id": userId},
            dataType:"json",
            success:function (data) {
                if (data.falg==false){
                    alert("重置密码失败")
                } else {
                    alert("重置密码成功")
                    window.load();
                }

            }
        })
	}
});

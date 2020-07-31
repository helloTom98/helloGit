$(function(){

    $.ajax({
        url:"/user/selectAll",
        type:"post",
        dataType:"json",
        success:function (data) {

            var userHtml='<tr>\n' +
                '\t\t\t\t\t\t<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">用户名</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">用户账号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">性别</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">年龄</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="150"><div class="STYLE1" align="center">电话</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="150"><div class="STYLE1" align="center">权限</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t</tr>'

            for (var i = 0; i < data.data.length; i++) {
                var userItem = data.data[i];

                userHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+userItem.id+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"> '+userItem.userName+' </span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="userView.html?id='+userItem.id+'" style="color:red" >'+userItem.userCode+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+genderFun(userItem.gender)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+ageFun(userItem.birthday)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+userItem.phone+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+userTypeFun(userItem.userType)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#user-list").html(userHtml);
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

//查询
$("#search").bind("click",function(){
    var name = $("#name").val();

    $.ajax({
        url:"/user/search",
        type:"post",
        data:{"userName":name},
        dataType:"json",
        success:function (data) {
            var userHtml='<tr>\n' +
                '\t\t\t\t\t\t<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">用户名</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">用户账号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">性别</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">年龄</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="150"><div class="STYLE1" align="center">电话</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="150"><div class="STYLE1" align="center">权限</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t</tr>'

            for (var i = 0; i < data.data.length; i++) {
                var userItem = data.data[i];

                userHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+userItem.id+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"> '+userItem.userName+' </span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="userView.html?id='+userItem.id+'" style="color:red" >'+userItem.userCode+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+genderFun(userItem.gender)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+ageFun(userItem.birthday)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+userItem.phone+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+userTypeFun(userItem.userType)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#user-list").html(userHtml);
        }
    })
});

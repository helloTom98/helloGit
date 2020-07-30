$(function(){

    $.ajax({
        url:"/provider/selectAll",
        type:"post",
        dataType:"json",
        success:function (data) {

            var providerHtml='<tr>\n' +
                '\t\t\t\t\t\t<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">供应商名称</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">联系人</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">联系电话</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">传真</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">操作时间</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t</tr>'

            for (var i = 0; i < data.data.length; i++) {
                var providerItem = data.data[i];

                providerHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+providerItem.id+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="providerView.html?id='+providerItem.id+'" style="color:red" >'+providerItem.proName+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proContact+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proPhone+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proFax+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+formatTime(providerItem.modifyDate)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#provider-list").html(providerHtml);
        }

    })

})

//根据供应商id查询供应商名称
// function providerNameById(providerId){
//     var providerName = "";
//     var provider;
//     $.ajaxSettings.async=false;
//     $.ajax({
//         url:"provider/selectProviderById",
//         type:"post",
//         data:{"id":providerId},
//         dataType:"json",
//         success:function (data) {
//             console.log(data);
//             provider = data.data;
//             providerName = provider.proName;
//         }
//     })
//     return providerName;
// }

//格式化时间戳(返回：2017-10-21 13:18:25)
function formatTime(timestamp){
    if(timestamp==null){
        return null;
    }

    var date = new Date(timestamp);

    Y = date.getFullYear(),
        m = date.getMonth()+1,
        d = date.getDate(),
        H = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
    if(m<10){
        m = '0'+m;
    }
    if(d<10){
        d = '0'+d;
    }
    if(H<10){
        H = '0'+H;
    }
    if(i<10){
        i = '0'+i;
    }
    if(s<10){
        s = '0'+s;
    }
    var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
    return t;
}

//查询
$("#search").bind("click",function(){
    var proName = $("#proName").val();

    $.ajax({
        url:"/provider/search",
        type:"post",
        data:{"proName":proName},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var providerHtml='<tr>\n' +
                '\t\t\t\t\t\t<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">供应商名称</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="80"><div class="STYLE1" align="center">联系人</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">联系电话</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">传真</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t\t<td width="100"><div class="STYLE1" align="center">操作时间</div>\n' +
                '\t\t\t\t\t\t</td>\n' +
                '\t\t\t\t\t</tr>'

            for (var i = 0; i < data.data.length; i++) {
                var providerItem = data.data[i];

                providerHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+providerItem.id+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="providerView.html?id='+providerItem.id+'" style="color:red" >'+providerItem.proName+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proContact+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proPhone+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerItem.proFax+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+formatTime(providerItem.modifyDate)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#provider-list").html(providerHtml);
        }
    })
});
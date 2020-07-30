$(function(){

    $.ajax({
        url:"/bill/selectAll",
        type:"post",
        dataType:"json",
        success:function (data) {
            var billHtml='<tr>\n' +
                '<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                ' </td>\n' +
                ' <td width="80"><div class="STYLE1" align="center">商品名称</div>\n' +
                ' </td>\n' +
                ' <td width="80"><div class="STYLE1" align="center">供应商</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">账单金额</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">是否付款</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">操作时间</div>\n' +
                ' </td>\n' +
                ' </tr>'

            for (var i = 0; i < data.data.length; i++) {
                var billItem = data.data[i];

                billHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+billItem.billCode+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="billView.html?id='+billItem.id+'" style="color:red" >'+billItem.productName+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerNameById(billItem.providerId)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+billItem.totalPrice+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">\n' +
                    '\t\t\t\t\t\t\t\n' +
                    '\t\t\t\t\t\t\t'+isPaymentFun(billItem.isPayment)+'\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+formatTime(billItem.modifyDate)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#bill-list").html(billHtml);
        }

    })

    $.ajax({
        url:"/provider/selectAll",
        type:"post",
        dataType:"json",
        success:function (data) {
            console.log(data);
            var optionHtml = '<option selected="selected" disabled="disabled"  style="display: none" value=""></option>'
            for (var i = 0;i<data.data.length;i++){
                var dataItem = data.data[i];
                optionHtml += '<option value="'+dataItem.id+'">'+dataItem.proName+'</option>'
            }

            $("#proId").html(optionHtml);

            $(".isPayed").hide();

        }
    })

})

//根据供应商id查询供应商名称
function providerNameById(providerId){
    var providerName = "";
    var provider;
    $.ajaxSettings.async=false;
    $.ajax({
        url:"/provider/selectProviderById",
        type:"post",
        data:{"id":providerId},
        dataType:"json",
        success:function (data) {
            console.log(data);
            provider = data.data;
            providerName = provider.proName;
        }
    })
    return providerName;
}

//判断是否已付款
function isPaymentFun (isPayment) {
    if(isPayment==1){
        return "否";
    }else{
        return "是";
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
    var productName = $("#productName").val();
    var proId = $("#proId").val();
    var payed = $('input[name="payed"]:checked').val();

    $.ajax({
        url:"/bill/search",
        type:"post",
        data:{"productName":productName, "proId":proId, "payed":payed},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var billHtml='<tr>\n' +
                '<td width="70" height="29"><div class="STYLE1" align="center">编号</div>\n' +
                ' </td>\n' +
                ' <td width="80"><div class="STYLE1" align="center">商品名称</div>\n' +
                ' </td>\n' +
                ' <td width="80"><div class="STYLE1" align="center">供应商</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">账单金额</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">是否付款</div>\n' +
                ' </td>\n' +
                ' <td width="100"><div class="STYLE1" align="center">操作时间</div>\n' +
                ' </td>\n' +
                ' </tr>'

            for (var i = 0; i < data.data.length; i++) {
                var billItem = data.data[i];

                billHtml+='<tr>\n' +
                    '\t\t\t\t\t\t<td height="23"><span class="STYLE1">'+billItem.billCode+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1"><a href="billView.html?id='+billItem.id+'" style="color:red" >'+billItem.productName+'</a>\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+providerNameById(billItem.providerId)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+billItem.totalPrice+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">\n' +
                    '\t\t\t\t\t\t\t\n' +
                    '\t\t\t\t\t\t\t'+isPaymentFun(billItem.isPayment)+'\n' +
                    '\t\t\t\t\t\t</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t\t<td><span class="STYLE1">'+formatTime(billItem.modifyDate)+'</span>\n' +
                    '\t\t\t\t\t\t</td>\n' +
                    '\t\t\t\t\t</tr>'
            }

            $("#bill-list").html(billHtml);
        }
    })
});
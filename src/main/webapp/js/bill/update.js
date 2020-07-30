//初始化
$(function () {
    var billId = window.location.href.split("?")[1].split("=")[1];
	$.ajax({
		url:"/bill/selectById",
		type:"post",
		data:{"id":billId},
		dataType:"json",
		success:function (data) {
			console.log(data);
			var bill = data.data;
			$("#billId").val(bill.id);
			var billUpdateHtml = '<tr>\n' +
                '\t\t\t\t\t<td class="field">商品名称：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="productName" class="text" id="productName" value="'+bill.productName+'"> <font color="red">*</font><font color="red" id="productName_span"></font></td>\n' +
                '\t\t\t   \t</tr>\n' +
                '\t\t\t   \t<tr>\n' +
                '\t\t\t\t\t<td class="field">商品单位：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="productUnit" class="text" id="productUnit" value="'+bill.productUnit+'"> <font color="red">*</font><font color="red" id="productUnit_span"></font></td>\n' +
                '\t\t\t   \t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">商品数量：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="productCount" class="text" id="productCount" value="'+bill.productCount+'"> <font color="red">*</font><font color="red" id="productCount_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">总额：</td>\n' +
                '\t\t\t\t\t<td><input name="billMoney" id="billMoney" class="text" value="'+bill.totalPrice+'"><font color="red">*</font><font color="red" id="billMoney_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t   \t<tr>\n' +
                '\t\t\t\t\t<td class="field">供应商：</td>\n' +
                '\t\t\t\t\t<td>\n' +
                '\t\t\t\t\t\t<select name="proId" id="proId">'+providerFun(bill.providerId)+'</select>\n' +
                '\t\t\t\t\t\t<font color="red">*</font><font color="red" id="proId_span"></font>\n' +
                '\t\t\t\t\t</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">是否付款：</td>\n' +
                '\t\t\t\t\t<td>'+isPaymentFun(bill.isPayment)+'</td>\n' +
                '\t\t\t\t</tr>'

            $("#bill-update").html(billUpdateHtml);
        }
	})

    // $.ajax({
    //     url:"provider/selectAll",
    //     type:"post",
    //     dataType:"json",
    //     success:function (data) {
    //         console.log(data);
    //         var optionHtml = ""
    //         for (var i = 0;i<data.data.length;i++){
    //             var dataItem = data.data[i];
    //             optionHtml += '<option value="'+dataItem.id+'">'+dataItem.proName+'</option>'
    //         }
	//
    //         $("#proId").html(optionHtml);
	//
    //     }
    // })
})

function providerFun(proId) {

    $.ajax({
        url:"/provider/selectAll",
        type:"post",
        dataType:"json",
        success:function (data) {
            var optionHtml = ""
            for (var i = 0;i<data.data.length;i++){
                var dataItem = data.data[i];
                if (dataItem.id == proId) {
                    optionHtml += '<option value="'+dataItem.id+'" selected="selected">'+dataItem.proName+'</option>'
				} else {
                    optionHtml += '<option value="'+dataItem.id+'">' + dataItem.proName + '</option>'
                }
            }

            $("#proId").html(optionHtml);

        }
    })

}

function isPaymentFun(isPayment){
	if (isPayment == 1) {
		return '<input type="radio" name="payed" value="2">是<input type="radio" name="payed" checked="checked" value="1">否';
	} else {
		return '<input type="radio" name="payed" checked="checked" value="2">是<input type="radio" name="payed" value="1">否';
	}
}

$("#update").bind("click",function(){
	//判断是否是数字的正则表达式
	var  passed=true;
	var p1 = "^\\d+$";
	if(!$("#productName").val())
	{
		$("#productName_span").text("请输入商品名称");
		passed=false;
	}
	if(!$("#productUnit").val())
	{
		$("#productUnit_span").text("请输入商品单位");
		passed=false;
	}
	
	if(!$("#productCount").val())
	{
		$("#productCount_span").text("请输入商品数量");
		passed=false;
	}else{
		var pattern = new RegExp(p1);
		if(!pattern.test($("#productCount").val()))
		{
			$("#productCount_span").text("请输入正确的商品数量");
			$("#productCount").val("");
			passed=false;
		}else{
			$("#productCount_span").text("");
		}
	}
	
	if(!$("#billMoney").val())
	{
		$("#billMoney_span").text("请输入总额");
		passed=false;
	}else{
		var pattern = new RegExp(p1);
		if(!pattern.test($("#billMoney").val()))
		{
			$("#billMoney_span").text("请输入正确的总额数字");
			$("#billMoney").val("");
			passed=false;
		}else{
			$("#billMoney_span").text("");
		}
	}
	
	if(!$("#proId").val())
	{
		$("#proId_span").text("请选择供应商");
		passed=false;
	}
	
	if(passed){
		if(confirm("确认提交？"))
			$("#form1").submit();
		else
			return false;
		
	}
});

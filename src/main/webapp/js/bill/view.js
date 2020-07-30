//通过账单id初始化账单详情页面
$(function(){
	var billId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        url:"/bill/selectById",
        type:"post",
		data:{"id":billId},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var bill = data.data;
            var billHtml='<tr>\n' +
                '\t\t\t\t\t<td class="field">账单编号：</td>\n' +
                '\t\t\t\t\t<td>'+bill.id+'<input type="hidden" id="billId" value="'+bill.id+'"></td>\n' +
                '\t\t\t  \t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">商品名称：</td>\n' +
                '\t\t\t\t\t<td>'+bill.productName+'</td>\n' +
                '\t\t\t  \t</tr>\n' +
                '\t\t\t  \t<tr>\n' +
                '\t\t\t\t\t<td class="field">商品单位：</td>\n' +
                '\t\t\t\t\t<td>'+bill.productUnit+'</td>\n' +
                '\t\t\t  \t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">商品数量：</td>\n' +
                '\t\t\t\t\t<td>'+bill.productCount+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">总额：</td>\n' +
                '\t\t\t\t\t<td>'+bill.totalPrice+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t   \t<tr>\n' +
                '\t\t\t\t\t<td class="field">供应商：</td>\n' +
                '\t\t\t\t\t<td>'+providerNameById(bill.providerId)+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">是否付款：</td>\n' +
                '\t\t\t\t\t<td>'+isPaymentFun(bill.isPayment)+'</td>\n' +
                '\t\t\t\t</tr>'

            $("#bill-view").html(billHtml);
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

//跳转修改页面
$("#update").bind("click",function(){
	var billId=$("#billId").val();

	window.location.href="billUpdate.html?billId="+billId;
});

//删除
$("#del").bind("click",function(){
    // document.getElementById("billId").value
	var billId=$("#billId").val();
	if(confirm("确认删除？")){
		$.ajax({
			url:"/bill/deleteById",
			type:"post",
			data:{"id":billId},
			dataType:"json",
			success:function (data) {
				console.log(data);

				if(data.flag == false){
					alert("删除失败！")
				}else{
					alert("删除成功！")
					window.location.href = "billList.html";
				}
			}
		})

	}
});

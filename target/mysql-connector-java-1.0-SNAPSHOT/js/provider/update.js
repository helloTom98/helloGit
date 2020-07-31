//根据proId初始化
$(function () {
	var proId = window.location.href.split("?")[1].split("=")[1];

	$.ajax({
        url: "/provider/selectProviderById",
		type:"post",
		data:{"id":proId},
		dataType:"json",
		success:function (data) {
			console.log(data);
			var provider = data.data;

			var providerHtml = '<tr>\n' +
                '\t\t\t\t\t<td class="field">供应商编号：</td>\n' +
                '\t\t\t\t\t<td><input type="hidden" name="proId" value="'+provider.id+'">'+provider.id+'</td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t \t<tr>\n' +
                '\t\t\t\t\t<td class="field">供应商名称：</td>\n' +
                '\t\t\t\t\t<td><input type="hidden" name="proName" value="'+provider.proName+'">'+provider.proName+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t <tr>\n' +
                '\t\t\t\t\t<td class="field">联系人：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="proContact" class="text" id="proContact" value="'+provider.proContact+'"> <font color="red">*</font><font color="red" id="proContact_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">联系电话：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="proPhone" class="text" id="proPhone" value="'+provider.proPhone+'"> <font color="red">*</font><font color="red" id="proPhone_span"></font></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">联系地址：</td>\n' +
                '\t\t\t\t\t<td><input name="proAddress" id="proAddress" class="text" value="'+provider.proAddress+'"></td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t   <tr>\n' +
                '\t\t\t\t\t<td class="field">传真：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="proFax" class="text" id="proFax" value="'+provider.proFax+'"> </td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t <tr>\n' +
                '\t\t\t\t\t<td class="field">描述：</td>\n' +
                '\t\t\t\t\t<td><input type="text" name="proDesc" class="text" id="proDesc" value="'+provider.proDesc+'"> </td>\n' +
                '\n' +
                '\t\t\t\t</tr>'

			$("#provider-update").html(providerHtml);
        }
    })
})

$("#update").bind("click",function(){
	//判断是否是数字的正则表达式
	var  passed=true;
	var p1 = "^\\d+$";
	if(!$("#proContact").val())
	{
		$("#proContact_span").text("请输入联系人");
		passed=false;
	}

	if(!$("#proPhone").val())
	{
		$("#proPhone_span").text("请输入电话");
		passed=false;
	}else{
		var pattern = new RegExp(p1);
		if(!pattern.test($("#proPhone").val()))
		{
			$("#proPhone_span").text("请输入正确的电话号码");
			$("#proPhone").val("");
			passed=false;
		}else{
			$("#proPhone_span").text("");
		}
	}
	if(passed){
		if(confirm("确认提交？"))
			$("#form1").submit();
		else
			return false;

	}
});

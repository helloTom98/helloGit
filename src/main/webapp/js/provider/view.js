$(function(){
    var providerId = window.location.href.split("?")[1].split("=")[1];

    $.ajax({
        url:"/provider/selectProviderById",
        type:"post",
        data:{"id":providerId},
        dataType:"json",
        success:function (data) {
            console.log(data);
            var provider = data.data;
            var providerHtml='<tr>\n' +
                '\t\t\t\t\t\t<td class="field">供应商编号：</td>\n' +
                '\t\t\t\t\t\t<td>'+provider.id+'<input type="hidden" id="proId" value="'+provider.id+'"></td>\n' +
                '\t\t\t\t\t\t\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t<tr>\n' +
                '\t\t\t\t\t\t<td class="field">供应商名称：</td>\n' +
                '\t\t\t\t\t\t<td>'+provider.proName+'</td>\n' +
                '\t\t\t\t\t</tr>\n' +
                '\t\t\t\t\t <tr>\n' +
                '\t\t\t\t\t<td class="field">联系人：</td>\n' +
                '\t\t\t\t\t<td>'+provider.proContact+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">联系电话：</td>\n' +
                '\t\t\t\t\t<td>'+provider.proPhone+'</td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t<tr>\n' +
                '\t\t\t\t\t<td class="field">联系地址：</td>\n' +
                '\t\t\t\t\t<td>'+provider.proAddress+'</td>\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t   <tr>\n' +
                '\t\t\t\t\t<td class="field">传真：</td>\n' +
                '\t\t\t\t\t<td>'+provider.proFax+'</td>\n' +
                '\n' +
                '\t\t\t\t</tr>\n' +
                '\t\t\t\t <tr>\n' +
                '\t\t\t\t\t<td class="field">描述：</td>\n' +
                '\t\t\t\t\t<td>'+provider.proDesc+'</td>\n' +
                '\n' +
                '\t\t\t\t</tr>'

            $("#provider-view").html(providerHtml);
        }

    })

})
//跳转修改页面
$("#update").bind("click",function(){
	var proId=$("#proId").val();
	window.location.href="providerUpdate.html?proId="+proId;
});
//删除
$("#del").bind("click",function(){
	var proId=$("#proId").val();
		if(confirm("确认删除？")){
		    $.ajax({
                url:"/provider/delete",
                type:"post",
                data:{"proId":proId},
                dateType:"json",
                success:function (data) {
                    if (data.flag == false) {
                        alert("删除供应商失败");
                        window.location.reload();
                    } else {
                        alert("删除供应商成功");
                        window.location.href="providerList.html";
                    }
                }
            })
		}
});

package com.whpu.zhongruanguoji.web.controller;


import com.whpu.zhongruanguoji.common.Result;
import com.whpu.zhongruanguoji.pojo.Bill;
import com.whpu.zhongruanguoji.pojo.Provider;
import com.whpu.zhongruanguoji.service.BillService;
import com.whpu.zhongruanguoji.service.ProviderService;
import com.whpu.zhongruanguoji.service.impl.BillServiceImpl;
import com.whpu.zhongruanguoji.service.impl.ProviderServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

@WebServlet("/provider/*")
public class ProviderServlet extends BaseServlet{
    ProviderService providerService = new ProviderServiceImpl();

    public void selectAll(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        PrintWriter out = response.getWriter();

        List<Provider> providerList = providerService.selectAll();

        Result result = new Result();
        if (providerList == null){
            result.setFlag(false);
            result.setMsg("查询失败");
        }else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(providerList);
        }

        wirteJson(response,result);
    }

    public void selectProviderById(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String providerId = request.getParameter("id");
        int id = Integer.parseInt(providerId);
        Provider provider = providerService.selectProviderById(id);

        Result result = new Result();
        if (provider == null){
            result.setFlag(false);
            result.setMsg("查询失败");

        } else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(provider);
        }

        wirteJson(response,result);
    }

    public void isExist(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String proName = (String) request.getParameter("proName");

        Provider provider = providerService.selectProviderByName(proName);
        Result result = new Result();
        if (provider == null){
            result.setFlag(false);
            result.setMsg("查询失败");
        } else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(provider);
        }

        wirteJson(response,result);
    }

    public void add(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String proName = request.getParameter("proName");
        String proContact = request.getParameter("proContact");
        String proPhone = request.getParameter("proPhone");
        String proAddress = request.getParameter("proAddress");
        String proFax = request.getParameter("proFax");
        String proDesc = request.getParameter("proDesc");
        Date creationDate = new Date();

        HttpSession session = request.getSession();
//        String createdByStr = (String) session.getAttribute("userCode");
//        int createdBy = Integer.parseInt(createdByStr);
        int createdBy = (int) session.getAttribute("userCode");

        Provider provider = new Provider();
        provider.setProName(proName);
        provider.setProDesc(proDesc);
        provider.setProContact(proContact);
        provider.setProPhone(proPhone);
        provider.setProAddress(proAddress);
        provider.setProFax(proFax);
        provider.setCreatedBy(createdBy);
        provider.setCreationDate(creationDate);

        int add = providerService.add(provider);
        Result result = new Result();
        if (add == 0){
            result.setFlag(false);
            result.setMsg("添加供应商失败");
        } else {
            result.setFlag(true);
            result.setMsg("添加供应商成功");

            response.sendRedirect("/providerList.html");
        }

        wirteJson(response,result);
    }

    public void update(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        int id = Integer.parseInt(request.getParameter("proId"));
        String proName = request.getParameter("proName");
        String proContact = request.getParameter("proContact");
        String proPhone = request.getParameter("proPhone");
        String proAddress = request.getParameter("proAddress");
        String proFax = request.getParameter("proFax");
        String proDesc = request.getParameter("proDesc");
        Date modifyDate = new Date();

        HttpSession session =request.getSession();
//        String modifyBtStr = (String) session.getAttribute("userCode");
//        int modifyBy = Integer.parseInt(modifyBtStr);
        int modifyBy = (int) session.getAttribute("userCode");

        Provider provider = new Provider();
        provider.setId(id);
        provider.setProName(proName);
        provider.setProContact(proContact);
        provider.setProPhone(proPhone);
        provider.setProAddress(proAddress);
        provider.setProFax(proFax);
        provider.setProDesc(proDesc);
        provider.setModifyBy(modifyBy);
        provider.setModifyDate(modifyDate);

        int update = providerService.update(provider);
        Result result = new Result();
        if (update == 0){
            result.setFlag(false);
            result.setMsg("更新供应商失败");
        } else {
            result.setFlag(true);
            result.setMsg("更新供应商成功");
            result.setData(update);

            response.sendRedirect("/providerView.html?id="+id);
        }

        wirteJson(response, result);

    }

    public void delete(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        int id = Integer.parseInt(request.getParameter("proId"));

        int delResult = providerService.delete(id);
        Result result = new Result();
        if (delResult == 0) {
            result.setFlag(false);
            result.setMsg("删除供应商失败");
        } else {
            result.setFlag(true);
            result.setMsg("删除供应商成功");
            result.setData(delResult);
        }

        wirteJson(response,result);
    }
    //搜索，模糊查
    public void search(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{

        String providerName = request.getParameter("proName");

        System.out.println("1："+ providerName);


        if (providerName == null) {
            providerName = "%";
        } else {
            providerName = "%"+providerName+"%";
        }


        System.out.println("2："+ providerName);

        List<Provider> providerList = providerService.searchLike(providerName);
        Result result = new Result();

        if (providerList==null) {
            result.setFlag(false);
            result.setMsg("模糊查询失败");
        } else {
            result.setFlag(true);
            result.setMsg("模糊查询成功");
            result.setData(providerList);
        }

        wirteJson(response,result);

    }
}

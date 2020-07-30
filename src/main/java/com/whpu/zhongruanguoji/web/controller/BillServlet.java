package com.whpu.zhongruanguoji.web.controller;


import cn.hutool.http.HttpResponse;
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

@WebServlet("/bill/*")
public class BillServlet extends BaseServlet{
    BillService billService = new BillServiceImpl();
    ProviderService providerService = new ProviderServiceImpl();

    //查询所有订单
    public void selectAll(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        PrintWriter out = response.getWriter();

        List<Bill> billList = billService.selectAll();

        Result result = new Result();
        if (billList == null){
            result.setFlag(false);
            result.setMsg("查询失败");

        }else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(billList);
        }
        wirteJson(response,result);
    }

    //根据id查询订单
    public void selectById(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String billId =(String) request.getParameter("id");

        int id = Integer.parseInt(billId);


        Bill bill = billService.selectById(id);

        Result result = new Result();
        if (bill == null){
            result.setFlag(false);
            result.setMsg("查询失败");

        }else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(bill);
        }
        wirteJson(response,result);
    }

    //新增订单
    public void add(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String productName = request.getParameter("productName");
        String productUnit = request.getParameter("productUnit");
        double productCount = Double.parseDouble(request.getParameter("productCount"));
        double totalPrice = Double.parseDouble(request.getParameter("billMoney"));
        int providerId = Integer.parseInt(request.getParameter("proId"));
        int isPayment =Integer.parseInt(request.getParameter("payed"));
        Date creationDate = new Date();

        Bill bill = new Bill();
        bill.setProductName(productName);
        bill.setProductUnit(productUnit);
        bill.setProductCount(productCount);
        bill.setTotalPrice(totalPrice);
        bill.setProviderId(providerId);
        bill.setIsPayment(isPayment);
        bill.setCreationDate(creationDate);

        HttpSession session = request.getSession();
        String userCode = "" + session.getAttribute("userCode");

        bill.setBillCode(userCode);
        int createdId = Integer.parseInt(userCode);
        bill.setCreatedBy(createdId);
        
//        System.out.println(bill);

        Result result = new Result();
        int addser = billService.add(bill);
        if(addser == 0){
            result.setFlag(false);
            result.setMsg("添加失败");

        } else {
            result.setFlag(true);
            result.setMsg("添加成功");

            response.sendRedirect("/billList.html");
        }

        wirteJson(response,result);


    }

    //根据id删除订单
    public void deleteById(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String billId =(String) request.getParameter("id");

        int id = Integer.parseInt(billId);

        int del = billService.deleteById(id);

        Result result = new Result();
        if (del == 0){
            result.setFlag(false);
            result.setMsg("删除失败");

        }else {
            result.setFlag(true);
            result.setMsg("删除成功");
            result.setData(del);
        }
        wirteJson(response,result);
    }

    //更新订单
    public void update(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        int billId = Integer.parseInt(request.getParameter("billId"));
        String productName = request.getParameter("productName");
        String productUnit = request.getParameter("productUnit");
        Double productCount = Double.parseDouble(request.getParameter("productCount"));
        Double totalPrice = Double.parseDouble(request.getParameter("billMoney"));
        int providerId = Integer.parseInt(request.getParameter("proId"));
        int isPayment = Integer.parseInt(request.getParameter("payed"));
        Date modifyDate = new Date();

        HttpSession session = request.getSession();
        int modifyBy = (int) session.getAttribute("userCode");

        Bill updateBill = new Bill();
        updateBill.setId(billId);
        updateBill.setProductName(productName);
        updateBill.setProductUnit(productUnit);
        updateBill.setProductCount(productCount);
        updateBill.setTotalPrice(totalPrice);
        updateBill.setProviderId(providerId);
        updateBill.setIsPayment(isPayment);
        updateBill.setModifyDate(modifyDate);
        updateBill.setModifyBy(modifyBy);

        Result result = new Result();
        int update = billService.update(updateBill);

        if (update == 0){
            result.setFlag(false);
            result.setMsg("更新账单失败");
        } else {
            result.setFlag(true);
            result.setMsg("更新账单成功");
            result.setData(update);

            response.sendRedirect("/billView.html?id="+billId);
        }

        wirteJson(response,result);
    }

    //搜索，模糊查询
    public void search(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String proName = request.getParameter("productName");
        String providerIdStr = request.getParameter("proId");
        String isPaymentStr = request.getParameter("payed");

//        System.out.println("调1试：" + proName + providerIdStr + isPaymentStr);
        
        if (proName == null) {
            proName = "%";
        } else {
            proName = "%"+proName+"%";
        }

        if (providerIdStr == null) {
            providerIdStr = "%";
        } else {
            providerIdStr = "%"+providerIdStr+"%";
        }
        
        if (isPaymentStr.equals("0")) {
            isPaymentStr = "%";
        } else {
            isPaymentStr = "%"+isPaymentStr+"%";
        }


//        System.out.println("调2试：" + proName + providerIdStr + isPaymentStr);

        List<Bill> billListS = billService.searchLike(proName, providerIdStr, isPaymentStr);
        Result result = new Result();
        if (billListS == null) {
            result.setFlag(false);
            result.setMsg("模糊查询失败");
        } else {
            result.setFlag(true);
            result.setMsg("模糊查询成功");
            result.setData(billListS);
        }
        
        wirteJson(response,result);

    }
}

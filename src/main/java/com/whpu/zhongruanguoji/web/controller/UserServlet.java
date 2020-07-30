package com.whpu.zhongruanguoji.web.controller;

import com.whpu.zhongruanguoji.common.Result;
import com.whpu.zhongruanguoji.pojo.User;
import com.whpu.zhongruanguoji.service.UserService;
import com.whpu.zhongruanguoji.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@WebServlet("/user/*")
public class UserServlet extends BaseServlet {
    UserService userService = new UserServiceImpl();  //调用业务层的方法
    public void login(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        // response.setContentType("application/json");        //表示响应到前端的数据是一个json数据   "text/html"
        PrintWriter out = response.getWriter();

        //1、接收用户传过来的账号和密码
        String userName = request.getParameter("username");
        String userPassword = request.getParameter("password");

        //2、调用业务层判断用户名称和密码是否正确
        User user = userService.login(userName, userPassword);
        //对user对象进行判断，如果为null则表示登陆失败，如果不null则表示登陆成功

        //创建一个结果对象
        Result result = new Result();
        if(user==null){
            result.setFlag(false);
            result.setMsg("登录失败");
            response.sendRedirect("/login.html");
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("userCode", user.getId());

            result.setFlag(true);
            result.setMsg("登录成功");
            response.sendRedirect("/frame.html");
        }
        //将结果对象转换成json
       // wirteJson(response,result);
    }

    public void selectAll(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        PrintWriter out = response.getWriter();

        List<User> userList = userService.selectAll();

        Result result = new Result();
        if (userList == null){
            result.setFlag(false);
            result.setMsg("查询失败");
        }else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(userList);
        }

        wirteJson(response,result);
    }

    public void isExist(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String userCode = (String) request.getParameter("loginName");

        User user = userService.selectUserByCode(userCode);
        Result result = new Result();
        if (user == null){
            result.setFlag(false);
            result.setMsg("查询失败");
        } else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(user);
        }

        wirteJson(response,result);
    }

    public void add(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String userName = request.getParameter("name");
        String userCode = request.getParameter("loginName");
        String userPassword = request.getParameter("password");
        int gender = Integer.parseInt(request.getParameter("gender"));

        String birthdayStr = request.getParameter("birthDate");
        SimpleDateFormat strToDateFormat = new SimpleDateFormat("yy-MM-dd");
        Date birthday = null;
        try {
            birthday = strToDateFormat.parse(birthdayStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        int userType = Integer.parseInt(request.getParameter("userType"));
        Date creationDate = new Date();

        HttpSession session = request.getSession();
//        String createdByStr = (String) session.getAttribute("userCode");
//        int createdBy = Integer.parseInt(createdByStr);
        int createdBy = (int) session.getAttribute("userCode");

        User user = new User();
        user.setUserName(userName);
        user.setUserCode(userCode);
        user.setUserPassword(userPassword);
        user.setGender(gender);
        user.setBirthday(birthday);
        user.setPhone(phone);
        user.setAddress(address);
        user.setUserType(userType);
        user.setCreatedBy(createdBy);
        user.setCreationDate(creationDate);

        int add = userService.add(user);
        Result result = new Result();
        if (add == 0){
            result.setFlag(false);
            result.setMsg("添加用户失败");
        } else {
            result.setFlag(true);
            result.setMsg("添加用户成功");

            response.sendRedirect("/userList.html");
        }

        wirteJson(response,result);
    }

    public void selectUserById(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        String userId = request.getParameter("id");
        int id = Integer.parseInt(userId);

        User user = userService.selectUserById(id);

        Result result = new Result();
        if (user == null){
            result.setFlag(false);
            result.setMsg("查询失败");
        }else {
            result.setFlag(true);
            result.setMsg("查询成功");
            result.setData(user);
        }

        wirteJson(response,result);
    }

    public void update(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        int id = Integer.parseInt(request.getParameter("userId"));
        String userName = request.getParameter("name");
        int gender = Integer.parseInt(request.getParameter("gender"));

        String birthdayStr = request.getParameter("birthDate");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd");
        Date birthday = null;
        try {
            birthday = simpleDateFormat.parse(birthdayStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        int userType = Integer.parseInt(request.getParameter("userType"));

        HttpSession session = request.getSession();
        int modifyBy = (int) session.getAttribute("userCode");

        Date modifyDate = new Date();

        User user = new User();
        user.setId(id);
        user.setUserName(userName);
        user.setGender(gender);
        user.setBirthday(birthday);
        user.setPhone(phone);
        user.setAddress(address);
        user.setUserType(userType);
        user.setModifyBy(modifyBy);
        user.setModifyDate(modifyDate);

        int update = userService.update(user);

        Result result = new Result();
        if (update == 0) {
            result.setFlag(false);
            result.setMsg("更新用户失败");

        } else {
            result.setFlag(true);
            result.setMsg("更新用户成功");
            result.setData(update);

            response.sendRedirect("/userView.html?id="+id);
        }

        wirteJson(response, result);
    }

    public void updatePwd(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        HttpSession session = request.getSession();

        int id = (int) session.getAttribute("userCode");
        String oldPwd = request.getParameter("oldPassword");
        String newPwd = request.getParameter("newPassword");

        int updateP = userService.updatePwd(id, oldPwd, newPwd);
        Result result = new Result();
        if (updateP == 0) {
            result.setFlag(false);
            result.setMsg("修改密码失败，请检查旧密码！");
        } else {
            result.setFlag(true);
            result.setMsg("修改密码成功");
            result.setData(updateP);
        }
        wirteJson(response,result);
    }

    public void rePassword(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{

        int id = Integer.parseInt(request.getParameter("id"));

        int rePass = userService.rePassword(id);
        Result result = new Result();
        if (rePass == 0) {
            result.setFlag(false);
            result.setMsg("重置密码失败");

        } else {
            result.setFlag(true);
            result.setMsg("重置密码成功");
            result.setData(rePass);
        }

        wirteJson(response,result);
    }

    public void delete(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{
        int id = Integer.parseInt(request.getParameter("userId"));

        int delResult = userService.delete(id);
        Result result = new Result();
        if (delResult == 0) {
            result.setFlag(false);
            result.setMsg("删除用户失败");
        } else {
            result.setFlag(true);
            result.setMsg("删除用户成功");
            result.setData(delResult);
        }

        wirteJson(response,result);
    }

    public void getLoginName(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{

        int id = (int) request.getSession().getAttribute("userCode");

        User user = userService.selectUserById(id);
        Result result = new Result();
        if (user == null) {
            result.setFlag(false);
            result.setMsg("查找失败");
        } else {
            result.setFlag(true);
            result.setMsg("查找成功");
            result.setData(user.getUserName());
        }
        wirteJson(response,result);
    }

    public void search(HttpServletRequest request, HttpServletResponse response)throws IOException, ServletException{

        String userName = request.getParameter("userName");

        System.out.println("1："+ userName);


        if (userName == null) {
            userName = "%";
        } else {
            userName = "%"+userName+"%";
        }

        System.out.println("2："+ userName);

        List<User> userList = userService.searchLike(userName);
        Result result = new Result();

        if (userList==null) {
            result.setFlag(false);
            result.setMsg("模糊查询失败");
        } else {
            result.setFlag(true);
            result.setMsg("模糊查询成功");
            result.setData(userList);
        }

        wirteJson(response,result);

    }

}

package com.whpu.zhongruanguoji.service.impl;

import com.whpu.zhongruanguoji.dao.UserDao;
import com.whpu.zhongruanguoji.dao.impl.UserDaoImpl;
import com.whpu.zhongruanguoji.pojo.User;
import com.whpu.zhongruanguoji.service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {

    UserDao userDao = new UserDaoImpl();  //创建数据库访问的对象

    @Override
    public List<User> selectAll() {
        List<User> userList = userDao.selectAll();
        return userList;
    }

    @Override
    public List<User> searchLike(String userName) {
        List<User> userList = userDao.searchLike(userName);
        return userList;
    }

    @Override
    public int delete(int id) {
        int result = userDao.deleteById(id);
        return result;
    }

    @Override
    public int rePassword(int id) {
        int result = userDao.rePassword(id);
        return result;
    }

    @Override
    public int updatePwd(int id, String oldPwd, String newPwd) {
        int result = userDao.updatePwd(id, oldPwd, newPwd);
        return result;
    }

    @Override
    public int update(User user) {
        int result = userDao.update(user);
        return result;
    }

    @Override
    public User selectUserById(int id) {
        User user = userDao.selectById(id);
        return user;
    }

    @Override
    public int add(User user) {
        int result = userDao.add(user);
        return result;
    }

    @Override
    public User selectUserByCode(String userCode) {
        User user = userDao.selectUserByCode(userCode);
        return user;
    }

    @Override
    public User login(String userCode, String userPassword) {

        User user = userDao.findByMobileAndPwd(userCode, userPassword);

        return user;
    }




}

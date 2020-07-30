package com.whpu.zhongruanguoji.dao.impl;

import com.whpu.zhongruanguoji.dao.UserDao;
import com.whpu.zhongruanguoji.pojo.User;
import com.whpu.zhongruanguoji.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class UserDaoImpl implements UserDao {

    //访问数据库使用QueryRunner对象来完成
    QueryRunner runner = new QueryRunner(JDBCUtils.getDataSource());


    @Override
    public List<User> selectAll() {
        String sql = "select * from smbms_user";
        List<User> userList = null;
        try {
            userList = runner.query(sql, new BeanListHandler<>(User.class));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }

    @Override
    public int rePassword(int id) {
        String sql = "update smbms_user set userPassword=123456 where id=?";
        int updateResult = 0;
        try {
            updateResult = runner.update(sql, id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return updateResult;
    }

    @Override
    public int updatePwd(int id, String oldPwd, String newPwd) {
        String sql = "update smbms_user set userPassword=? where id=? and userPassword=?";
        int updatePassword = 0;
        try {
            updatePassword = runner.update(sql, newPwd, id, oldPwd);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return updatePassword;
    }

    @Override
    public int update(User user) {
        String sql = "update smbms_user set userName=?, gender=?, birthday=?, phone=?, address=?, userType=?, modifyBy=?, modifyDate=? where id=?";
        int update = 0;
        try {
            update = runner.update(sql, user.getUserName(), user.getGender(), user.getBirthday(), user.getPhone(), user.getAddress(), user.getUserType(), user.getModifyBy(), user.getModifyDate(), user.getId());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    @Override
    public User selectById(int id) {
        String sql = "select * from smbms_user where id=?";
        User user = null;
        try {
            user = runner.query(sql, new BeanHandler<>(User.class), id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public int add(User user) {
        String sql = "insert into smbms_user values(null,?,?,?,?,?,?,?,?,?,?,null,null)";
        int add = 0;
        try {
            add = runner.update(sql, user.getUserCode(), user.getUserName(), user.getUserPassword(), user.getGender(), user.getBirthday(), user.getPhone(), user.getAddress(), user.getUserType(), user.getCreatedBy(), user.getCreationDate());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return add;
    }

    @Override
    public User selectUserByCode(String userCode) {
        String sql = "select * from smbms_user where userCode=?";
        User user = null;
        try {
            user = runner.query(sql, new BeanHandler<>(User.class), userCode);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    public int deleteById(int id) {
        String sql = "delete from smbms_user where id=?";

        int deleteResult = 0;
        try {
            deleteResult = runner.update(sql, id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return deleteResult;
    }


    //登陆
    @Override
    public User findByMobileAndPwd(String userCode, String userPassword) {

        String sql = "select * from smbms_user where id=? and userPassword=?";
        User user =null;
        try {
             user = runner.query(sql, new BeanHandler<>(User.class), userCode, userPassword);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user;
    }

    @Override
    public List<User> searchLike(String userName) {
        String sql = "select * from smbms_user where userName like ?";
        List<User> userList = null;
        try {
            userList = runner.query(sql, new BeanListHandler<>(User.class), userName);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userList;
    }
}

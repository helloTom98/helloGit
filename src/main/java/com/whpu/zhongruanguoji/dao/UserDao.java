package com.whpu.zhongruanguoji.dao;


import com.whpu.zhongruanguoji.pojo.User;

import java.util.List;

public interface UserDao {
    List<User> selectAll();

    User findByMobileAndPwd(String userName, String userPassword);

    User selectUserByCode(String userCode);

    User selectById(int id);

    int add(User user);

    int update(User user);

    int updatePwd(int id, String oldPwd, String newPwd);

    int rePassword(int id);

    int deleteById(int id);

    List<User> searchLike(String userName);



}

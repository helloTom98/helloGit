package com.whpu.zhongruanguoji.service;


import com.whpu.zhongruanguoji.pojo.User;

import java.util.List;

public interface UserService {
     List<User> selectAll();

     User login(String userName, String userPassword);

     User selectUserByCode(String userCode);

     User selectUserById(int id);

     int add(User user);

     int update(User user);

     int updatePwd(int id, String oldPwd, String newPwd);

     int rePassword(int id);

     int delete(int id);

     List<User> searchLike(String userName);

}

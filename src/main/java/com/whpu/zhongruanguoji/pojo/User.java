package com.whpu.zhongruanguoji.pojo;


import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

@Data
public class User implements java.io.Serializable{

    private Integer id;             //主键ID
    private String userCode;        //用户编码
    private String userName;        //用户名称
    private String userPassword;    //用户密码
    private Integer gender;         //性别
    private Date birthday;          //出生日期
    private String phone;           //手机
    private String address;         //地址
    private Integer userType;       //用户类型
    private Integer createdBy;      //创建者
    private Date creationDate;      //创建时间
    private Integer modifyBy;       //更新者
    private Date modifyDate;        //更新时间
}

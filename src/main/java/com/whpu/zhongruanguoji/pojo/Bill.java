package com.whpu.zhongruanguoji.pojo;


import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

@Data
public class Bill implements java.io.Serializable{

    private Integer id;             //主键ID
    private String billCode;        //账单编码
    private String productName;     //商品名称
    private String productDesc;     //商铺描述
    private String productUnit;     //单位
    private double productCount;    //商品数量
    private double totalPrice;      //账单总金额
    private Integer isPayment;      //是否付款
    private Integer providerId;     //供应商ID
    private Date creationDate;          //创建时间
    private Integer createdBy;      //创建者
    private Date modifyDate;        //更新时间
    private Integer modifyBy;       //更新者

}

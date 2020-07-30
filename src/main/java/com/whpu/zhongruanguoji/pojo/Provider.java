package com.whpu.zhongruanguoji.pojo;


import lombok.Data;

import java.math.BigInteger;
import java.util.Date;

@Data
public class Provider implements java.io.Serializable{

    private Integer id;       //主键ID
    private String proCode;   //供应商编码
    private String proName;   //供应商名称
    private String proDesc;   //供应商描述信息
    private String proContact;//供应商联系人
    private String proPhone;  //联系电话
    private String proAddress;//地址
    private String proFax;    //传真
    private Integer createdBy;//创建者
    private Date creationDate;//创建时间
    private Integer modifyBy; //更新者
    private Date modifyDate;  //更新时间

}

package com.whpu.zhongruanguoji.dao.impl;

import com.whpu.zhongruanguoji.dao.BillDao;
import com.whpu.zhongruanguoji.pojo.Bill;
import com.whpu.zhongruanguoji.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BillDaoImpl implements BillDao {
    //访问数据库使用QueryRunner对象来完成
    QueryRunner runner = new QueryRunner(JDBCUtils.getDataSource());

    @Override
    public List<Bill> searchLike(String proName, String providerIdStr, String isPaymentStr) {
        String sql = "select * from smbms_bill where productName like ? and providerId like ? and isPayment like ?";
        List<Bill> billList = null;
        try {
            billList = runner.query(sql, new BeanListHandler<>(Bill.class), proName, providerIdStr, isPaymentStr);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return billList;
    }

    @Override
    public int update(Bill updateBill) {
        String sql = "update smbms_bill set productName=?, productUnit=?, productCount=?, totalPrice=?, isPayment=?, providerId=?, modifyDate=?, modifyBy=? where id=?";
        int update = 0;
        try {
            update = runner.update(sql, updateBill.getProductName(), updateBill.getProductUnit(), updateBill.getProductCount(), updateBill.getTotalPrice(), updateBill.getIsPayment(), updateBill.getProviderId(), updateBill.getModifyDate(), updateBill.getModifyBy(), updateBill.getId());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    @Override
    public int deleteById(int id) {
        String sql = "delete from smbms_bill where id=?";
        int del = 0;
        try {
            del = runner.update(sql, id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return del;
    }

    @Override
    public Bill selectById(int id) {
        String sql = "select * from smbms_bill where id=?";
        try {
            Bill bill = runner.query(sql, new BeanHandler<>(Bill.class), id);
            return bill;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(Bill bill) {
        String sql = "insert into smbms_bill values(null,?,?,null,?,?,?,?,?,?,?,null,null)";
        int insert = 0;
        try {
//            insert = runner.insert(sql, new ScalarHandler<>(), bill.getBillCode(), bill.getProductName(), bill.getProductUnit(), bill.getProductCount(), bill.getTotalPrice(), bill.getIsPayment(), bill.getProviderId(), bill.getCreationDate(), bill.getCreatedBy());
            insert = runner.update(sql, bill.getBillCode(), bill.getProductName(), bill.getProductUnit(), bill.getProductCount(), bill.getTotalPrice(), bill.getIsPayment(), bill.getProviderId(), bill.getCreationDate(), bill.getCreatedBy());
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return insert;
    }

    @Override
    public List<Bill> selectAll() {
        String sql = "select * from smbms_bill";

        try {
            List<Bill> billList = runner.query(sql, new BeanListHandler<>(Bill.class));
            return billList;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}

package com.whpu.zhongruanguoji.service.impl;

import com.whpu.zhongruanguoji.dao.BillDao;
import com.whpu.zhongruanguoji.dao.impl.BillDaoImpl;
import com.whpu.zhongruanguoji.pojo.Bill;
import com.whpu.zhongruanguoji.service.BillService;

import java.util.List;

public class BillServiceImpl implements BillService {
    BillDao billDao = new BillDaoImpl();

    @Override
    public int update(Bill updateBill) {
        int result = billDao.update(updateBill);
        return result;
    }

    @Override
    public List<Bill> searchLike(String proName, String providerIdStr, String isPaymentStr) {
        List<Bill> billList = billDao.searchLike(proName, providerIdStr, isPaymentStr);
        return billList;
    }

    @Override
    public int deleteById(int id) {
        int result = billDao.deleteById(id);
        return result;
    }

    @Override
    public Bill selectById(int id) {
        Bill bill = billDao.selectById(id);
        return bill;
    }

    @Override
    public int add(Bill bill) {
        int result = billDao.add(bill);
        return result;
    }

    @Override
    public List<Bill> selectAll() {
        List<Bill> billList = billDao.selectAll();
        return billList;
    }
}

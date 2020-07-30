package com.whpu.zhongruanguoji.service;

import com.whpu.zhongruanguoji.pojo.Bill;

import java.util.List;

public interface BillService {
    List<Bill> selectAll();
    int add(Bill bill);
    Bill selectById(int id);
    int deleteById(int id);
    int update(Bill updateBill);
    List<Bill> searchLike(String proName, String providerIdStr, String isPaymentStr);
}

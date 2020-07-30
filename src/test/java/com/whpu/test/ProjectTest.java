package com.whpu.test;

import com.whpu.zhongruanguoji.pojo.Bill;
import com.whpu.zhongruanguoji.pojo.User;
import com.whpu.zhongruanguoji.service.BillService;
import com.whpu.zhongruanguoji.service.UserService;
import com.whpu.zhongruanguoji.service.impl.BillServiceImpl;
import com.whpu.zhongruanguoji.service.impl.UserServiceImpl;
import org.junit.Test;

import java.math.BigInteger;
import java.util.List;

public class ProjectTest {
    UserService userService = new UserServiceImpl();
    BillService billService = new BillServiceImpl();

    @Test
    public void testJdbc(){
        User user = userService.login("张三","333333");
        System.out.println(user);
    }
    
    @Test
    public void testBill(){
        List<Bill> billList = billService.selectAll();
        for (Bill bill : billList) {
            System.out.println(bill);
        }
    }

    @Test
    public void testCast(){
//        BigInteger bi = newBigInteger("123");
//
//        inti = bi.intValue();
//
//        longl = bi.longValue();
//
//        System.out.println(i);
//
//        System.out.println(l);

        BigInteger bi = new BigInteger("123");

        int i = bi.intValue();
        Long l = bi.longValue();

        System.out.println(i);
        System.out.println(l);
    }
}

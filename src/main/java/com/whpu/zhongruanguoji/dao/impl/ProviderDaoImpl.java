package com.whpu.zhongruanguoji.dao.impl;

import com.whpu.zhongruanguoji.dao.ProviderDao;
import com.whpu.zhongruanguoji.pojo.Provider;
import com.whpu.zhongruanguoji.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class ProviderDaoImpl implements ProviderDao {
    QueryRunner runner = new QueryRunner(JDBCUtils.getDataSource());

    @Override
    public List<Provider> selectAll() {
        String sql = "select * from smbms_provider";
        try {
            List<Provider> providerList = runner.query(sql, new BeanListHandler<>(Provider.class));
            return providerList;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int add(Provider provider) {
        String sql = "insert into smbms_provider values(null,null,?,?,?,?,?,?,?,?,null,null)";
        int add = 0;
        try {
            add = runner.update(sql, provider.getProName(), provider.getProDesc(), provider.getProContact(), provider.getProPhone(), provider.getProAddress(), provider.getProFax(), provider.getCreatedBy(), provider.getCreationDate());
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return add;
    }

    @Override
    public Provider selectProviderByName(String proName) {
        String sql = "select * from smbms_provider where proName=?";
        try {
            Provider provider = runner.query(sql, new BeanHandler<>(Provider.class), proName);
            return provider;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Provider> searchLike(String providerName) {
        String sql = "select * from smbms_provider where proName like ?";
        List<Provider> providerList = null;
        try {
            providerList = runner.query(sql, new BeanListHandler<>(Provider.class), providerName);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return providerList;
    }

    @Override
    public int deleteById(int id) {
        String sql = "delete from smbms_provider where id=?";

        int deleteResult = 0;
        try {
            deleteResult = runner.update(sql, id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return deleteResult;
    }

    @Override
    public int update(Provider provider) {
        String sql = "update smbms_provider set proName=?, proContact=?, proPhone=?, proAddress=?, proFax=?, proDesc=?, modifyBy=?, modifyDate=? where id=?";
        int update = 0;
        try {
            update = runner.update(sql, provider.getProName(), provider.getProContact(), provider.getProPhone(), provider.getProAddress(), provider.getProFax(), provider.getProDesc(), provider.getModifyBy(), provider.getModifyDate(), provider.getId());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return update;
    }

    //*
    @Override
    public Provider selectProviderById(int id) {
        String sql = "select * from smbms_provider where id = ?";
        try {
            Provider provider = runner.query(sql, new BeanHandler<>(Provider.class), id);
            return provider;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}

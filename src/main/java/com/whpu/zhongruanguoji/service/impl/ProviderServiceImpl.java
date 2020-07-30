package com.whpu.zhongruanguoji.service.impl;

import com.whpu.zhongruanguoji.dao.ProviderDao;
import com.whpu.zhongruanguoji.dao.impl.ProviderDaoImpl;
import com.whpu.zhongruanguoji.pojo.Provider;
import com.whpu.zhongruanguoji.service.ProviderService;

import java.util.List;

public class ProviderServiceImpl implements ProviderService {
    ProviderDao providerDao = new ProviderDaoImpl();

    @Override
    public List<Provider> selectAll() {
        List<Provider> providerList = providerDao.selectAll();
        return providerList;
    }

    @Override
    public int delete(int id) {
        int result = providerDao.deleteById(id);
        return result;
    }

    @Override
    public int update(Provider provider) {
        int result = providerDao.update(provider);
        return result;
    }

    @Override
    public int add(Provider provider) {
        int result = providerDao.add(provider);
        return result;
    }

    @Override
    public List<Provider> searchLike(String providerName) {
        List<Provider> providerList = providerDao.searchLike(providerName);
        return providerList;
    }

    @Override
    public Provider selectProviderByName(String proName) {
        Provider provider = providerDao.selectProviderByName(proName);
        return provider;
    }

    @Override
    public Provider selectProviderById(int id) {
        Provider provider = providerDao.selectProviderById(id);
        return provider;
    }
}

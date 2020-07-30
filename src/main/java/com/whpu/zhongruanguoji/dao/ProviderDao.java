package com.whpu.zhongruanguoji.dao;

import com.whpu.zhongruanguoji.pojo.Provider;

import java.util.List;

public interface ProviderDao {
    List<Provider> selectAll();
    Provider selectProviderById(int id);
    Provider selectProviderByName(String proName);
    int add(Provider provider);
    int update(Provider provider);
    int deleteById(int id);
    List<Provider> searchLike(String providerName);

}

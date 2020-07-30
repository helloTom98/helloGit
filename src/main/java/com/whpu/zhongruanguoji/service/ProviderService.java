package com.whpu.zhongruanguoji.service;

import com.whpu.zhongruanguoji.pojo.Provider;

import java.util.List;

public interface ProviderService {
    List<Provider> selectAll();
    Provider selectProviderById(int id);
    Provider selectProviderByName(String proName);
    int add(Provider provider);
    int update(Provider provider);
    int delete(int id);

    List<Provider> searchLike(String providerName);
}

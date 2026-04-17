import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/CacheManage',
}

// 获取缓存列表
export function getCacheList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取缓存详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除缓存
export function delCache(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 删除全部缓存
export function delAllCache() {
  return requestClient.post(`${Api.Prefix}/Actions/ClearAll`);
}

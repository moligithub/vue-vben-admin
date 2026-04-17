import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/BigData',
}

// 获取数据列表（分页）
export function getBigDataList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 预览数据库表
export function createBigData() {
  return requestClient.post(Api.Prefix);
}

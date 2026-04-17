import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/bi/visual',
}

// 获取大屏下拉框
export function getDataVSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}

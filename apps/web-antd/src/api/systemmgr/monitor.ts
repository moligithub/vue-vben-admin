import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Monitor',
}

// 获取系统监控
export function getSysMonitor() {
  return requestClient.get(Api.Prefix);
}

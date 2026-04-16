import { defHttp } from '/@/utils/http/axios';

enum Api {
  Prefix = '/bot/systemmgr/Monitor',
}

// 获取系统监控
export function getSysMonitor() {
  return defHttp.get({ url: Api.Prefix });
}

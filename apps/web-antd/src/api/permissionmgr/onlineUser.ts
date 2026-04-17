import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/OnlineUser',
}

// 获取在线用户列表
export function getOnlineUser(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 批量强制下线
export function batchDelOnlineUser(ids: string[]) {
  return requestClient.delete(Api.Prefix, { data: { ids } });
}
// 强制下线
export function deleteOnlineUser(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}

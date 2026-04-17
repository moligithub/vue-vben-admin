import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/FlowTask',
}

// 新建表单
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 更新表单
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}

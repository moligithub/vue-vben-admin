import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/InterfaceOauth',
}

// 获取接口认证列表(分页)
export function getInterfaceOauthList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 创建接口认证
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改接口认证
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 删除接口认证数据
export function delInterfaceOauth(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 获取秘钥
export function getAppSecret() {
  return requestClient.get(`${Api.Prefix}/getAppSecret`);
}
// 保存认证接口列表
export function saveInterfaceList(data: any) {
  return requestClient.post(`${Api.Prefix}/saveInterfaceList`, data);
}
// 获取认证接口列表
export function getInterfaceList(id: string) {
  return requestClient.get(`${Api.Prefix}/getInterfaceList/${id}`);
}
// 获取接口日志列表
export function getLogList(data: any) {
  return requestClient.get(`${Api.Prefix}/dataInterfaceLog/${data.id}`, {
    params: data,
  });
}
//保存授权用户
export function saveUserList(data: any) {
  return requestClient.post(`${Api.Prefix}/SaveUserList`, data);
}

import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Group',
}

// 获取分组列表
export function getGroupList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取分组下拉框列表
export function getGroupSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建分组
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
export const createGroup = create;
// 修改分组
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
export const updateGroup = update;
// 获取分组
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除分组
export function delGroup(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取选中角色基本信息
export function getGroupByCondition(data: any) {
  return requestClient.post(`${Api.Prefix}/GroupCondition`, data);
}

import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Role',
}

// 获取角色列表
export function getRoleList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取角色下拉框列表
export function getRoleSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 获取角色下拉框列表(带权限)
export function getRoleSelectorByPermission() {
  return requestClient.get(`${Api.Prefix}/SelectorByPermission`);
}
// 新建角色
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
export const createRole = create;
// 修改角色
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
export const updateRole = update;
// 获取角色
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除角色
export function delRole(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 通过组织id获取角色列表
export function getRoleByOrganize(organizeIds: string[]) {
  return requestClient.post(`${Api.Prefix}/getListByOrgIds`, { organizeIds });
}
// 获取选中角色基本信息
export function getRoleByCondition(data: any) {
  return requestClient.post(`${Api.Prefix}/RoleCondition`, data);
}

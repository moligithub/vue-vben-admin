import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/PermissionGroup',
}

//获取权限列表
export function getList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取权限信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除权限
export function del(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 修改权限
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 新建权限
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 复制权限
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
//获取权限成员
export function getPermissionMember(id: string) {
  return requestClient.get(`${Api.Prefix}/PermissionMember/${id}`);
}
//保存权限成员
export function savePermissionMember(data: any) {
  return requestClient.post(`${Api.Prefix}/PermissionMember/${data.id}`, data);
}
//获取权限组下拉
export function getPermissionSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 查看权限组
export function getPermissionGroup(data: any) {
  return requestClient.get(`${Api.Prefix}/getPermissionGroup`, {
    params: data,
  });
}
// 通过权限组id获取相关权限
export function getPermissionInfo(data: any) {
  return requestClient.get(`${Api.Prefix}/getPermission`, { params: data });
}

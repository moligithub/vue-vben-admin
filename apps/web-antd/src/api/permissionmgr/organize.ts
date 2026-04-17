import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Organize',
  TratorPrefix = '/bot/permissionmgr/organizeAdminIsTrator',
  DepartmentPrefix = '/bot/permissionmgr/Organize/Department',
}

// 获取组织/公司列表
export function getOrganizeList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取组织/公司下拉框列表
export function getOrganizeSelector(id: string = '0') {
  return requestClient.get(`${Api.Prefix}/Selector/${id || '0'}`);
}
// 获取组织/公司下拉框列表(带权限)
export function getOrganizeSelectorByAuth(id: string = '0') {
  return requestClient.get(`${Api.Prefix}/SelectorByAuth/${id || '0'}`);
}
// 获取组织/公司树形
export function getOrganizeTree() {
  return requestClient.get(`${Api.Prefix}/Tree`);
}
// 新建组织/公司
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改组织/公司
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取组织/公司
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除组织/公司
export function delOrganize(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取分级管理
export function getOrganizeTrator(organizeId: string) {
  return requestClient.get(`${Api.TratorPrefix}/${organizeId}`);
}
// 更新分级管理
export function setOrganizeTrator(data: any) {
  return requestClient.put(`${Api.TratorPrefix}/${data.organizeId}`, data);
}
// 通过部门id获取部门树形
export function getOrgByOrganizeCondition(data: any) {
  return requestClient.post(`${Api.Prefix}/OrganizeCondition`, data);
}
// 获取部门下拉框列表(公司+部门)
export function getDepartmentSelector(id: string = '0') {
  return requestClient.get(`${Api.DepartmentPrefix}/Selector/${id || '0'}`);
}
// 获取部门下拉框列表(公司+部门) ---带权限
export function getDepartmentSelectorByAuth(id: string = '0') {
  return requestClient.get(
    `${Api.DepartmentPrefix}/SelectorByAuth/${id || '0'}`,
  );
}
// 新建组织/公司
export function createDepartment(data: any) {
  return requestClient.post(Api.DepartmentPrefix, data);
}
// 修改部门
export function updateDepartment(data: any) {
  return requestClient.put(`${Api.DepartmentPrefix}/${data.id}`, data);
}
// 获取部门
export function getDepartmentInfo(id: string) {
  return requestClient.get(`${Api.DepartmentPrefix}/${id}`);
}

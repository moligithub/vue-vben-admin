import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Users',
}

// 获取用户列表
export function getUserList(params: any) {
  return requestClient.get(Api.Prefix, { params });
}
// 获取所有用户列表
export function getUserListAll() {
  return requestClient.get(`${Api.Prefix}/All`);
}
// 获取用户下拉框列表(公司+部门+用户)
export function getUserSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 新建用户
export function createUser(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改用户
export function updateUser(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取用户信息
export function getUserInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除用户
export function delUser(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 修改用户密码
export function resetUserPassword(data: any) {
  return requestClient.post(
    `${Api.Prefix}/${data.id}/Actions/ResetPassword`,
    data,
  );
}
// 更新用户状态
export function updateUserState(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/State`);
}
// 解除锁定
export function unlockUser(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/unlock`);
}
// IM通讯获取用户
export function getImUser(data: any) {
  return requestClient.get(`${Api.Prefix}/ImUser`, { params: data });
}
// 获取用户下拉框列表
export function getImUserSelector(organizeId: string, data: any = {}) {
  return requestClient.post(
    `${Api.Prefix}/ImUser/Selector/${organizeId}`,
    data,
  );
}
// 获取用户基本信息
export function getUserInfoList(ids: string[]) {
  return requestClient.post(`${Api.Prefix}/getUserList`, { ids });
}
// 获取我的下属
export function getSubordinates(keyword: string) {
  const data = { keyword };
  return requestClient.post(`${Api.Prefix}/getSubordinates`, data);
}
// 获取当前组织用户
export function getOrganization(data: any) {
  return requestClient.get(`${Api.Prefix}/getOrganization`, { params: data });
}
// 通过岗位id获取用户树
export function getUsersByPositionId(data: any) {
  return requestClient.get(`${Api.Prefix}/GetUsersByPositionId`, {
    params: data,
  });
}
// 通过角色id获取用户列表
export function getUsersByRoleId(data: any) {
  return requestClient.get(`${Api.Prefix}/getUsersByRoleId`, { params: data });
}
// 通过角色id获取组织下的用户列表
export function getUsersByRoleOrgId(data: any) {
  return requestClient.get(`${Api.Prefix}/GetUsersByRoleOrgId`, {
    params: data,
  });
}
// 通过部门id,岗位id,角色id,分组id,用户id获取用户列表(带分页)
export function getUsersByUserCondition(data: any) {
  return requestClient.post(`${Api.Prefix}/UserCondition`, data);
}
// 导出用户Excel
export function exportExcel(data: any) {
  return requestClient.get(`${Api.Prefix}/ExportData`, { params: data });
}
// 用户导入模板下载
export function templateDownload() {
  return requestClient.get(`${Api.Prefix}/TemplateDownload`);
}
// 导入
export function importData(data: any) {
  return requestClient.post(`${Api.Prefix}/ImportData`, data);
}
// 导入预览
export function importPreview(data: any) {
  return requestClient.get(`${Api.Prefix}/ImportPreview`, { params: data });
}
// 导出错误数据
export function exportExceptionData(data: any) {
  return requestClient.post(`${Api.Prefix}/ExportExceptionData`, data);
}
// 获取用户下拉框列表
export function getListByAuthorize(organizeId: string, keyword: string) {
  return requestClient.post(`${Api.Prefix}/GetListByAuthorize/${organizeId}`, {
    keyword,
  });
}
// 获取选中组织、岗位、角色、用户基本信息
export function getSelectedList(ids: string[]) {
  return requestClient.post(`${Api.Prefix}/getSelectedList`, { ids });
}
// 获取选中组织、岗位、角色、用户基本信息
export function getSelectedUserList(data: any) {
  return requestClient.post(`${Api.Prefix}/getSelectedUserList`, data);
}
// 获取离职交接数据
export function getWorkByUser(data: any) {
  return requestClient.get(`${Api.Prefix}/getWorkByUser`, { params: data });
}
// 工作交接
export function workHandover(data: any) {
  return requestClient.post(`${Api.Prefix}/workHandover`, data);
}

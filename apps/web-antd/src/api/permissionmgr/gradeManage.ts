import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/organizeAdminIsTrator',
}

// 获取分级管理员列表
export function getGradeManageList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
export const getGradeList = getGradeManageList;

// 获取分级管理员下拉框列表
export function getSelectorOrgList(userId: string) {
  return requestClient.get(`${Api.Prefix}/Selector?userId=${userId}`);
}

// 新建分级管理员
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
export const createGrade = create;

// 删除分级管理员
export function delGradeManage(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
export const delGrade = delGradeManage;

// 修改分级管理员
export function updateGrade(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}

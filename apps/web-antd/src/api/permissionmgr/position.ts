import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/Position',
}

// 获取岗位列表(分页)
export function getPositionList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取岗位下拉框列表（公司+部门+岗位）
export function getPositionSelector() {
  return requestClient.get(`${Api.Prefix}/Selector`);
}
// 获取全部岗位管理信息列表
export function getPositionListAll() {
  return requestClient.get(`${Api.Prefix}/All`);
}
// 新建岗位
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
export const createPosition = create;
// 修改岗位
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
export const updatePosition = update;
// 获取岗位
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除岗位
export function delPosition(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 通过组织id获取岗位列表
export function getPositionByOrganize(organizeIds: string[]) {
  return requestClient.post(`${Api.Prefix}/getListByOrgIds`, { organizeIds });
}
// 通过部门id,岗位id获取岗位树形
export function getPositionByCondition(data: any) {
  return requestClient.post(`${Api.Prefix}/PositionCondition`, data);
}

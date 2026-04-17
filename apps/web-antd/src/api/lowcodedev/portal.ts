import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/lowcodedev/Portal',
  AtlasPrefix = '/bot/systemmgr/atlas',
  DashboardPrefix = '/bot/lowcodedev/Dashboard',
  SchedulePrefix = '/bot/systemmgr/Schedule',
  portalPrefix = '/bot/systemmgr/PortalManage',
}

// 获取门户列表
export function getPortalList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取门户信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除门户
export function delPortal(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 修改门户
export function updatePortal(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 新建门户
export function createPortal(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 复制门户
export function copyPortal(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出门户
export function exportPortal(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Export`);
}
// 获取门户下拉框列表
export function getPortalSelector(type?: string, systemId?: string) {
  return requestClient.get(`${Api.Prefix}/Selector?platform=Web`, {
    params: { type, systemId },
  });
}
// 切换用户门户默认显示
export function setDefaultPortal(id: string) {
  return requestClient.put(
    `${Api.Prefix}/${id}/Actions/SetDefault?platform=Web`,
  );
}
// 获取门户展示数据(权限)
export function getAuthPortal(id: string, data: any) {
  return requestClient.get(`${Api.Prefix}/${id}/auth`, { params: data });
}
// 获取全国省市区
export function getAtlas() {
  return requestClient.get(Api.AtlasPrefix);
}
// 获取地图json
export function getMapData(data: any) {
  return requestClient.get(`${Api.AtlasPrefix}/geojson`, { params: data });
}
// 用户拖拽后更新
export function UpdateCustomPortal(id: string, data: any) {
  return requestClient.put(`${Api.Prefix}/Custom/Save/${id}`, data);
}
// 获取我的待办
export function getFlowTodoCount(data: any) {
  return requestClient.post(`${Api.DashboardPrefix}/FlowTodoCount`, data);
}
// 获取通知公告
export function getNoticeList(data: any) {
  return requestClient.post(`${Api.DashboardPrefix}/Notice`, data);
}
// 获取未读邮件
export function getEmailList() {
  return requestClient.get(`${Api.DashboardPrefix}/Email`);
}
// 获取待办事项
export function getFlowTodoList() {
  return requestClient.get(`${Api.DashboardPrefix}/FlowTodo`);
}
// 获取我的待办事项
export function getMyFlowTodoList(data: any) {
  return requestClient.get(`${Api.DashboardPrefix}/MyFlowTodo`, {
    params: data,
  });
}
// 获取日程安排列表
export function getScheduleList(data: any) {
  return requestClient.get(Api.SchedulePrefix, { params: data });
}
// 新建日程安排
export function createSchedule(data: any) {
  return requestClient.post(Api.SchedulePrefix, data);
}
// 更新日程安排
export function updateSchedule(data: any, type: string) {
  return requestClient.put(`${Api.SchedulePrefix}/${data.id}/${type}`, data);
}
// 删除日程安排
export function delSchedule(id: string, type: string) {
  return requestClient.delete(`${Api.SchedulePrefix}/${id}/${type}`);
}
// 获取日程安排信息
export function getScheduleInfo(id: string) {
  return requestClient.get(`${Api.SchedulePrefix}/${id}`);
}
// 查看日程详情
export function getScheduleDetail(groupId: string, id: string) {
  return requestClient.get(
    `${Api.SchedulePrefix}/detail?groupId=${groupId}&id=${id}`,
  );
}
//发布
export function release(id: string, data: any) {
  return requestClient.put(`${Api.Prefix}/Actions/release/${id}`, data);
}
// 获取门户管理列表
export function getPortalManageList(data: any) {
  return requestClient.get(`${Api.portalPrefix}/list/${data.systemId}`, {
    params: data,
  });
}
// 获取门户名称列表
export function getPortalManageSelector(data: any) {
  return requestClient.get(`${Api.Prefix}/manage/Selector/${data.systemId}`, {
    params: data,
  });
}
// 获取门户管理详情
export function getPortalManageInfo(id: string) {
  return requestClient.get(`${Api.portalPrefix}/${id}`);
}
// 新建门户管理
export function createPortalManage(data: any) {
  return requestClient.post(Api.portalPrefix, data);
}
// 编辑门户管理
export function updatePortalManage(data: any) {
  return requestClient.put(`${Api.portalPrefix}/${data.id}`, data);
}
// 删除门户管理
export function delPortalManage(id: string) {
  return requestClient.delete(`${Api.portalPrefix}/${id}`);
}

// 获取应用列表(发布过滤)
export function getSystemListFilter(data: any, id: string) {
  return requestClient.get(`${Api.Prefix}/systemFilter/${id}`, {
    params: data,
  });
}

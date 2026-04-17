import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/Menu',
}

// 获取菜单列表
export function getMenuList(data: any) {
  return requestClient.get(`${Api.Prefix}/ModuleBySystem/${data.systemId}`, {
    params: data,
  });
}
// 获取上级菜单下拉框
export function getMenuSelector(data: any, id: string, systemId: string = '0') {
  return requestClient.get(
    `${Api.Prefix}/Selector/${(!!id ? id : '0') + '/' + systemId}`,
    { params: data },
  );
}
// 获取菜单列表（下拉框）
export function getSelectorAll(data: any) {
  return requestClient.get(`${Api.Prefix}/Selector/All`, { params: data });
}
// 新建菜单
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改菜单
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取菜单详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除菜单
export function delMenu(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 导出系统菜单数据
export function exportMenu(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 查看权限组
export function getMenuPermissionGroup(data: any) {
  return requestClient.get(`${Api.Prefix}/getPermissionGroup/${data.id}`);
}
// 通过权限组id获取相关权限
export function getMenuPermissionInfo(data: any) {
  return requestClient.get(
    `${Api.Prefix}/getPermission/${data.id}/${data.permissionId}`,
  );
}

// 获取上级菜单下拉框(发布过滤)
export function getMenuSelectorFilter(data: any, id: string) {
  return requestClient.get(`${Api.Prefix}/SelectorFilter/${!!id ? id : '0'}`, {
    params: data,
  });
}

// 获取所有菜单
export function getAllMenusApi() {
  return requestClient.get(`${Api.Prefix}/GetAll`);
}

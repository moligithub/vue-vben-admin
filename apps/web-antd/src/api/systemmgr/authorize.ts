import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/ModuleDataAuthorizeLink',
}

//获取表名
export function getVisualTables(menuId: string, type: string) {
  return requestClient.get(`${Api.Prefix}/getVisualTables/${menuId}/${type}`);
}
//据表名获取数据表字段
export function getTableInfoByTableName(data: any) {
  return requestClient.get(
    `${Api.Prefix}/${data.linkId}/Tables/${data.tableName}/Fields/${data.menuType}/${data.dataType}`,
    { params: data },
  );
}
//保存编辑数据连接
export function update(data: any) {
  return requestClient.post(`${Api.Prefix}/saveLinkData`, data);
}
//数据连接信息
export function getInfo(menuId: string, type: string) {
  return requestClient.get(`${Api.Prefix}/getInfo/${menuId}/${type}`);
}

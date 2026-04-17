import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/DictionaryData',
  TypePrefix = '/bot/systemmgr/DictionaryType',
}

// 获取数据字典分类
export function getDictionaryType() {
  return requestClient.get(Api.TypePrefix);
}
// 获取字典分类下拉框列表
export function getDictionaryTypeSelector(id: string = '0') {
  return requestClient.get(`${Api.TypePrefix}/Selector/${id || '0'}`);
}
// 添加数据字典分类
export function createDictionaryType(data: any) {
  return requestClient.post(Api.TypePrefix, data);
}
// 修改数据字典分类
export function updateDictionaryType(data: any) {
  return requestClient.put(`${Api.TypePrefix}/${data.id}`, data);
}
// 获取数据字典分类信息
export function getDictionaryTypeInfo(id: string) {
  return requestClient.get(`${Api.TypePrefix}/${id}`);
}
// 删除数据字典分类
export function delDictionaryType(id: string) {
  return requestClient.delete(`${Api.TypePrefix}/${id}`);
}

// 获取数据字典分类
export function getDictionaryDataList(params: any) {
  return requestClient.get(`${Api.Prefix}/${params.typeId}`, { params });
}
// 获取数据字典列表(分类+内容)
export function getDictionaryAll() {
  return requestClient.get(`${Api.Prefix}/All`);
}
// 获取字典分类下拉框(项目上级)
export function getDictionaryDataTypeSelector(
  typeId: string,
  isTree: boolean,
  id: string = '0',
) {
  return requestClient.get(`${Api.Prefix}/${typeId}/Selector/${id || '0'}`, {
    params: { isTree },
  });
}
// 获取字典数据下拉框列表
export function getDictionaryDataSelector(typeId: string) {
  return requestClient.get(`${Api.Prefix}/${typeId}/Data/Selector`);
}
// 添加数据字典
export function createDictionaryData(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改数据字典
export function updateDictionaryData(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取数据字典信息
export function getDictionaryDataInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Info`);
}
// 删除数据字典信息
export function delDictionaryData(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 导出数据字典数据
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}

import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/lowcodedev/ShortLink',
}

// 获取外链信息
export function getShortLinkInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 保存外链信息
export function updateShortLink(data: any) {
  return requestClient.put(Api.Prefix, data);
}
// 获取外链信息(渲染列表)
export function getConfig(id: string, encryption: string = '') {
  return requestClient.get(
    `${Api.Prefix}/getConfig/${id}${encryption ? `?encryption=${encryption}` : ''}`,
  );
}
// 校验外链密码
export function checkPwd(data: any) {
  return requestClient.post(`${Api.Prefix}/checkPwd`, data);
}
// 获取外链列表表单配置JSON
export function getConfigData(modelId: string, encryption: string = '') {
  return requestClient.get(
    `${Api.Prefix}/${modelId}/Config${encryption ? `?encryption=${encryption}` : ''}`,
  );
}
// 获取外链数据列表
export function getModelList(data: any) {
  return requestClient.post(
    `${Api.Prefix}/${data.modelId}/ListLink${data.encryption ? `?encryption=${data.encryption}` : ''}`,
    data,
  );
}
// 新建外链数据
export function createModel(
  modelId: string,
  data: any,
  encryption: string = '',
) {
  return requestClient.post(
    `${Api.Prefix}/${modelId}${encryption ? `?encryption=${encryption}` : ''}`,
    data,
  );
}
// 获取外链数据详情
export function getDataChange(
  modelId: string,
  id: string,
  encryption: string = '',
) {
  return requestClient.get(
    `${Api.Prefix}/${modelId}/${id}/DataChange${encryption ? `?encryption=${encryption}` : ''}`,
  );
}

import { requestClient } from '#/api/request';

enum Api {
  PreviewFile = '/bot/filehandler/Uploader/Preview',
  Merge = '/bot/filehandler/merge',
  AMap = '/bot/systemmgr/Location',
}

// 获取下载文件链接
export function getDownloadUrl(type: string, fileName: string = '') {
  return requestClient.get(`/bot/filehandler/Download/${type}/${fileName}`);
}
// 获取全部下载文件链接（打包下载）
export function getPackDownloadUrl(type: string, data: any) {
  return requestClient.post(`/bot/filehandler/PackDownload/${type}`, data);
}
// 预览文件
export function previewFile(data: any) {
  return requestClient.get(Api.PreviewFile, { params: data });
}
// 分片组装
export function chunkMerge(data: any) {
  return requestClient.post(Api.Merge, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}
// 下载导入示例模板
export function getTemplateDownload(url: string) {
  return requestClient.get(`/bot/${url}/TemplateDownload`);
}
// 下载导入示例模板
export function getImportPreview(url: string, data: any) {
  return requestClient.get(`/bot/${url}/ImportPreview`, { params: data });
}
// 导入数据
export function importData(url: string, data: any) {
  return requestClient.post(`/bot/${url}/ImportData`, data);
}
// 导入数据
export function getImportExceptionData(url: string, data: any) {
  return requestClient.post(`/bot/${url}/ImportExceptionData`, data);
}
// 查询附近数据
export function getAroundList(data: any) {
  return requestClient.get(`${Api.AMap}/around`, { params: data });
}
// 根据关键字查询附近数据
export function getTextList(data: any) {
  return requestClient.get(`${Api.AMap}/text`, { params: data });
}
// 输入提示
export function getInputTips(data: any) {
  return requestClient.get(`${Api.AMap}/inputtips`, { params: data });
}
// 导入
export function upload(url: string, data: any) {
  return requestClient.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

// 获取权限码
export function getAccessCodesApi() {
  return requestClient.get('/bot/permissionmgr/Users/Current/Authorize');
}

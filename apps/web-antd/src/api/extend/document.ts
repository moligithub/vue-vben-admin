import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/Document',
}

// 获取知识管理列表（全部文档）
export function getAllList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 添加文件夹
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改文件名/文件夹名
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 删除文件/文件夹
export function delDocument(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取知识管理列表（文件夹树）
export function getFolderTree(id: string = '0') {
  return requestClient.get(`${Api.Prefix}/FolderTree/${id}`);
}
// 获取文件/文件夹信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 移动文件/文件夹
export function moveTo(id: string, toId: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/MoveTo/${toId}`);
}
// 取消分享文件/文件夹
export function shareCancel(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}/Actions/Share`);
}
// 分享文件/文件夹
export function createShare(id: string, userId: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Share`, { userId });
}
// 知识管理（我的共享列表）
export function getShareOutList(data: any) {
  return requestClient.get(`${Api.Prefix}/Share`, { params: data });
}
// 获取知识管理列表（共享给我）
export function getShareTomeList(data: any) {
  return requestClient.get(`${Api.Prefix}/ShareTome`, { params: data });
}
// 获取知识管理列表（共享人员）
export function getShareUserList(documentId: string) {
  return requestClient.get(`${Api.Prefix}/ShareUser/${documentId}`);
}
// 获取知识管理列表（回收站）
export function getTrashList(data: any) {
  return requestClient.get(`${Api.Prefix}/Trash`, { params: data });
}
// 回收站（彻底删除）
export function trashDelete(id: string) {
  return requestClient.delete(`${Api.Prefix}/Trash/${id}`);
}
// 回收站（还原文件）
export function trashRecovery(id: string) {
  return requestClient.post(`${Api.Prefix}/Trash/${id}/Actions/Recovery`);
}
// 下载文件
export function download(id: string) {
  return requestClient.post(`${Api.Prefix}/Download/${id}`);
}
// 分片组装
export function documentMerge(data: any) {
  return requestClient.post(`${Api.Prefix}/merge`, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

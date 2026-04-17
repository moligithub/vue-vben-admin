import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/filehandler',
}

// 获取文件列表
export function getFileList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 删除文件
export function delFile(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}

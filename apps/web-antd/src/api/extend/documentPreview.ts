import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/DocumentPreview',
}

// 获取文档列表
export function getDocumentPreviewList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 文件在线预览
export function previewFile(fileId: string, type: string) {
  return requestClient.get(
    `${Api.Prefix}/${fileId}/Preview?previewType=${type}`,
  );
}

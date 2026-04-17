import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/imcenter',
  NoticePrefix = '/bot/imcenter/Notice',
}

// 获取系统公告列表
export function getNoticeList(data: any) {
  return requestClient.post(`${Api.NoticePrefix}/List`, data);
}
// 新建公告
export function create(data: any) {
  return requestClient.post(Api.NoticePrefix, data);
}
// 修改公告
export function update(data: any) {
  return requestClient.put(`${Api.NoticePrefix}/${data.id}`, data);
}
// 获取公告详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.NoticePrefix}/${id}`);
}
// 删除公告
export function delNotice(id: string) {
  return requestClient.delete(`${Api.NoticePrefix}/${id}`);
}
// 发布公告
export function release(id: string) {
  return requestClient.put(`${Api.NoticePrefix}/${id}/Actions/Release`);
}

// 获取消息中心列表
export function getMessageList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 全部已读
export function readAllMsg(data: any) {
  return requestClient.post(`${Api.Prefix}/Actions/ReadAll`, data);
}
// 查看消息内容
export function readInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/ReadInfo/${id}`);
}
// 删除消息
export function delMsgRecord(data: any) {
  return requestClient.delete(`${Api.Prefix}/Record`, { data });
}

// 获取IM对话列表
export function getIMReply() {
  return requestClient.get(`${Api.Prefix}/imreply`);
}
// 删除聊天记录
export function deleteChatRecord(id: string) {
  return requestClient.delete(`${Api.Prefix}/imreply/deleteChatRecord/${id}`);
}
// 移除聊天记录
export function removeChatRecord(id: string) {
  return requestClient.delete(`${Api.Prefix}/imreply/relocation/${id}`);
}

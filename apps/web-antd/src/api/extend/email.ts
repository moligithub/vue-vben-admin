import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/Email',
}

// 获取邮件列表(收件箱、标星件、草稿箱、已发送)
export function getEmailList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取邮箱配置
export function getConfigInfo() {
  return requestClient.get(`${Api.Prefix}/Config`);
}
// 更新邮件配置
export function saveConfig(data: any) {
  return requestClient.put(`${Api.Prefix}/Config`, data);
}
// 邮箱配置-测试连接
export function checkMail(data: any) {
  return requestClient.post(`${Api.Prefix}/Config/Actions/CheckMail`, data);
}
// 发邮件
export function saveSent(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 存草稿
export function saveDraft(data: any) {
  return requestClient.post(`${Api.Prefix}/Actions/SaveDraft`, data);
}
// 获取邮件信息
export function getEmailInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除邮件
export function delEmail(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 设置已读邮件
export function setRead(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/Read`);
}
// 设置未读邮件
export function setUnread(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/Unread`);
}
// 设置标星邮件
export function setStar(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/Star`);
}
// 设置取消标星
export function setUnStar(id: string) {
  return requestClient.put(`${Api.Prefix}/${id}/Actions/Unstar`);
}
// 收邮件
export function receive() {
  return requestClient.post(`${Api.Prefix}/Receive`);
}

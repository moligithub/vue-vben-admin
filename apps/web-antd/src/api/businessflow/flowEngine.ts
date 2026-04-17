import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/flowTemplate',
  CommentPrefix = '/bot/businessflow/Engine/FlowComment',
}

// 获取流程引擎列表(分页)
export function getFlowEngineList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建流程引擎
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改流程引擎
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取流程引擎
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除流程引擎
export function delFlowEngine(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 复制流程引擎
export function copy(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/Actions/Copy`);
}
// 导出
export function exportData(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}
// 发布流程引擎
export function release(id: string) {
  return requestClient.post(`${Api.Prefix}/Release/${id}`);
}
// 停止流程引擎
export function stop(id: string) {
  return requestClient.post(`${Api.Prefix}/Stop/${id}`);
}
// 通过流程enCode获取流程id
export function getFlowIdByCode(enCode: string) {
  return requestClient.get(`${Api.Prefix}/getFlowIdByCode/${enCode}`);
}
// 列表ListAll
export function getFlowEngineListAll() {
  return requestClient.get(`${Api.Prefix}/ListAll`);
}
// 列表ListAll(分页)
export function getFlowEnginePageList(data: any) {
  return requestClient.get(`${Api.Prefix}/PageListAll`, { params: data });
}
// 列表流程小idListAll
export function getFlowEnginePageChildList(data: any) {
  return requestClient.get(`${Api.Prefix}/PageChildListAll`, { params: data });
}
// 流程引擎下拉框
export function getFlowEngineSelector(type: string) {
  return requestClient.get(`${Api.Prefix}/Selector`, { params: { type } });
}
// 获取流程发起节点表单信息
export function getFlowFormInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/FormInfo`);
}
// 流程版本列表
export function getFlowJsonList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.templateId}/FlowJsonList`, {
    params: data,
  });
}
// 设置主版本
export function setMainVersion(id: string) {
  return requestClient.post(`${Api.Prefix}/${id}/MainVersion`);
}
// 删除流程版本
export function delVersion(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}/FlowJson`);
}
// 获取多流程流程列表
export function getFlowList(id: string, type: string = '') {
  return requestClient.get(`${Api.Prefix}/FlowJsonList/${id}`, {
    params: { type },
  });
}
// 委托可选全部流程
export function getFlowEngineForEntrust(data: any) {
  return requestClient.get(`${Api.Prefix}/getflowAll`, { params: data });
}
// 委托 通过list<flowId>获取流程引擎列表
export function getFlowEngineListByIds(data: any) {
  return requestClient.post(`${Api.Prefix}/getflowList`, data);
}
// 设置流程协管
export function assist(data: any) {
  return requestClient.post(`${Api.Prefix}/assist`, data);
}
// 获取协管列表
export function getAssistList(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/assistList`);
}
//所属流程列表(树形)
export function getTreeList() {
  return requestClient.get(`${Api.Prefix}/TreeList`);
}
// 获取流程评论列表
export function getCommentList(data: any) {
  return requestClient.get(Api.CommentPrefix, { params: data });
}
// 新建流程评论
export function createComment(data: any) {
  return requestClient.post(Api.CommentPrefix, data);
}
// 删除流程评论
export function delComment(id: string) {
  return requestClient.delete(`${Api.CommentPrefix}/${id}`);
}

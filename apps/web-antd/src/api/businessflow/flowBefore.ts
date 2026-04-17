import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/businessflow/Engine/FlowBefore',
}

// 获取待我审核
export function getFlowBeforeList(data: any) {
  return requestClient.get(`${Api.Prefix}/List/${data.category}`, {
    params: data,
  });
}
// 获取待我审批信息
export function getFlowBeforeInfo(id: string, data: any) {
  return requestClient.get(`${Api.Prefix}/${id}`, { params: data });
}
// 待我审核审核
export function audit(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Audit/${id}`, data);
}
// 待我审核退回
export function saveAudit(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/SaveAudit/${id}`, data);
}
// 待我审核退回
export function reject(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Reject/${id}`, data);
}
// 撤回审核
export function recall(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Recall/${id}`, data);
}
// 终止审核
export function cancel(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Cancel/${id}`, data);
}
// 待我审核转审
export function transfer(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Transfer/${id}`, data);
}
// 流程监控指派
export function assign(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Assign/${id}`, data);
}
// 获取流程复活和变更节点下拉数据
export function getResurgenceList(id: string) {
  return requestClient.get(`${Api.Prefix}/Selector/${id}`);
}
// 流程复活和变更提交
export function resurgence(data: any) {
  return requestClient.post(`${Api.Prefix}/Change`, data);
}
// 获取审批汇总
export function getRecordList(id: string, data: any) {
  return requestClient.get(`${Api.Prefix}/RecordList/${id}`, { params: data });
}
// 判断是否有候选人
export function getCandidates(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/Candidates/${id}`, data);
}
// 获取候选人列表（分页）
export function getCandidateUser(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/CandidateUser/${id}`, data);
}
// 批量通过、退回、转审  batchType 0-通过 1-退回 2-转审
export function batchOperation(data: any) {
  return requestClient.post(`${Api.Prefix}/BatchOperation`, data);
}
// 获取批量审批候选人
export function getBatchCandidate(data: any) {
  return requestClient.get(`${Api.Prefix}/BatchCandidate`, { params: data });
}
// 获取审批汇总
export function getBatchFlowSelector() {
  return requestClient.get(`${Api.Prefix}/BatchFlowSelector`);
}
// 获取批量审批流程（小id）
export function getBatchFlowJsonList(id: string) {
  return requestClient.get(`${Api.Prefix}/BatchFlowJsonList/${id}`);
}
// 获取流程节点列表
export function getNodeSelector(id: string) {
  return requestClient.get(`${Api.Prefix}/NodeSelector/${id}`);
}
// 判断是否有查看权限(消息通知用)
export function checkInfo(taskOperatorId: string) {
  return requestClient.get(`${Api.Prefix}/${taskOperatorId}/Info`);
}
// 获取退回下拉接口
export function getRejectList(id: string) {
  return requestClient.get(`${Api.Prefix}/RejectList/${id}`);
}
// 加签
export function freeApprover(id: string, data: any) {
  return requestClient.post(`${Api.Prefix}/freeApprover/${id}`, data);
}
// 获取挂起类型
export function getSuspendType(id: string) {
  return requestClient.get(`${Api.Prefix}/Suspend/${id}`);
}
// 挂起流程
export function suspend(data: any) {
  return requestClient.post(`${Api.Prefix}/Suspend/${data.id}`, data);
}
// 恢复流程
export function restore(id: string) {
  return requestClient.post(`${Api.Prefix}/Restore/${id}`);
}
// 查看子流程
export function getSubFlowInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/SubFlowInfo/${id}`);
}

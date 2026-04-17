import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/BillRule',
}

// 获取单据规则列表(带分页)
export function getBillRuleList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 获取单据规则下拉框列表
export function getBillRuleSelector(data: any) {
  return requestClient.get(`${Api.Prefix}/Selector`, { params: data });
}
// 新建单据规则
export function createBillRule(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改单据规则
export function updateBillRule(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取单据规则
export function getBillRuleInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 删除单据规则
export function delBillRule(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 生成单据单号
export function getBillNumber(enCode: string) {
  return requestClient.get(`${Api.Prefix}/BillNumber/${enCode}`);
}
// 导出
export function exportTpl(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/Actions/Export`);
}

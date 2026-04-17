import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/CrmOrder',
}

// 获取订单列表
export function getOrderList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 删除订单
export function delOrder(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取订单列表-订单商品
export function getOrderEntryList(id: string) {
  return requestClient.get(`${Api.Prefix}/OrderEntry/${id}/Items`);
}
// 获取订单列表-收款计划
export function getOrderPlanList(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}/CollectionPlan`);
}
// 获取客户列表
export function getCustomerList(keyword?: string) {
  return requestClient.get(`${Api.Prefix}/Customer`, { params: { keyword } });
}
// 获取客户列表
export function getGoodsList(data: any) {
  return requestClient.get(`${Api.Prefix}/Goods`, { params: data });
}

import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/saleOrder',
}

// 获取订单列表
export function getOrderList(data: any) {
  return requestClient.get(`${Api.Prefix}/Product`, { params: data });
}
//订单详情
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/Product/${id}`);
}
//新建订单
export function createOrder(data: any) {
  return requestClient.post(`${Api.Prefix}/Product`, data);
}
// 编辑订单
export function updateOrder(data: any) {
  return requestClient.put(`${Api.Prefix}/Product/${data.id}`, data);
}
// 删除订单
export function delOrder(id: string) {
  return requestClient.delete(`${Api.Prefix}/Product/${id}`);
}
// 获取客户类别
export function getCustomer(data: any) {
  return requestClient.get(`${Api.Prefix}/Customer`, { params: data });
}
// 获取分类
export function getProductClassify() {
  return requestClient.get(`${Api.Prefix}/Classify`);
}
// 获取商品列表
export function getGoodsList(data: any) {
  return requestClient.get(`${Api.Prefix}/Goods`, { params: data });
}
// 获取商品列表(通过type)
export function getGoodsListByType(type: string) {
  return requestClient.get(`${Api.Prefix}/Goods/getGoodList?type=${type}`);
}
// 获取销售明细
export function getProductEntry(id: string) {
  return requestClient.get(`${Api.Prefix}/Product/ProductEntry/${id}`);
}
// 产品下拉
export function getGoodsSelector(data: any) {
  return requestClient.get(`${Api.Prefix}/Goods/Selector`, { params: data });
}

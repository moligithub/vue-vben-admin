import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/systemmgr/SysConfig',
  SynPrefix = '/bot/systemmgr/SynThirdInfo',
}

// 获取系统配置
export function getSysConfig() {
  return requestClient.get(Api.Prefix);
}
// 更新系统配置
export function update(data: any) {
  return requestClient.put(Api.Prefix, data);
}
// 测试企业微信配置的连接
export function testQy(data: any, type: string) {
  return requestClient.post(`${Api.Prefix}/${type}/testQyWebChatConnect`, data);
}
// 测试企业微信配置的连接
export function testDing(data: any) {
  return requestClient.post(`${Api.Prefix}/testDingTalkConnect`, data);
}
// 获取系统管理员
export function getAdminList() {
  return requestClient.get(`${Api.Prefix}/getAdminList`);
}
// 设置系统管理员
export function setAdminList(data: any) {
  return requestClient.put(`${Api.Prefix}/setAdminList`, data);
}
//本地所有组织信息(包含公司和部门)同步到钉钉
export function synAllOrganizeSysToDing(type: string) {
  return requestClient.get(
    `${Api.SynPrefix}/synAllOrganizeSysToDing?type=${type}`,
  );
}
// 本地所有用户信息同步到钉钉
export function synAllUserSysToDing(type: string) {
  return requestClient.get(`${Api.SynPrefix}/synAllUserSysToDing?type=${type}`);
}
// 本地所有组织信息(包含公司和部门)同步到企业微信
export function synAllOrganizeSysToQy(type: string) {
  return requestClient.get(
    `${Api.SynPrefix}/synAllOrganizeSysToQy?type=${type}`,
  );
}
// 本地所有用户信息同步到企业微信
export function synAllUserSysToQy(type: string) {
  return requestClient.get(`${Api.SynPrefix}/synAllUserSysToQy?type=${type}`);
}
// 获取第三方(如：企业微信、钉钉)的组织与用户同步统计信息
// thirdType: 1-企业微信; 2-钉钉
export function getSynData(type: string) {
  return requestClient.get(`${Api.SynPrefix}/getSynThirdTotal/${type}`);
}

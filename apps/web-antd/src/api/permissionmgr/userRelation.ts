import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/permissionmgr/UserRelation',
}

// 获取岗位/角色成员列表
export function getUserRelationList(objectId: string) {
  return requestClient.get(`${Api.Prefix}/${objectId}`);
}
// 添加/更新岗位或角色成员
export function createUserRelation(data: any) {
  return requestClient.post(`${Api.Prefix}/${data.objectId}`, data);
}

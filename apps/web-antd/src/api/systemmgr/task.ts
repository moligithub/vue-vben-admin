import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/scheduletask',
}

// 获取任务调度列表
export function getTaskList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 新建任务调度
export function create(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改任务调度
export function update(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 获取任务调度信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/Info/${id}`);
}
// 删除任务调度
export function delTask(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取任务调度日志列表
export function getTaskLogList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.id}/TaskLog`, {
    params: data,
  });
}
// 获取本地任务下拉列表
export function getTaskMethodsList() {
  return requestClient.get(`${Api.Prefix}/TaskMethods`);
}

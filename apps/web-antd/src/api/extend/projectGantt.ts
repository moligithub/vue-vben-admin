import { requestClient } from '#/api/request';

enum Api {
  Prefix = '/bot/extend/ProjectGantt',
}

//获取项目管理列表
export function getProjectList(data: any) {
  return requestClient.get(Api.Prefix, { params: data });
}
// 添加项目
export function createProject(data: any) {
  return requestClient.post(Api.Prefix, data);
}
// 修改项目
export function updateProject(data: any) {
  return requestClient.put(`${Api.Prefix}/${data.id}`, data);
}
// 删除项目/任务
export function delProject(id: string) {
  return requestClient.delete(`${Api.Prefix}/${id}`);
}
// 获取项目信息
export function getInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/${id}`);
}
// 获取项目任务列表
export function getTaskList(data: any) {
  return requestClient.get(`${Api.Prefix}/${data.projectId}/Task`, {
    params: data,
  });
}
// 获取项目任务树形（新建任务）
export function getTaskSelector(projectId: string, id: string = '0') {
  return requestClient.get(`${Api.Prefix}/${projectId}/Task/Selector/${id}`);
}
// 获取项目任务信息
export function getTaskInfo(id: string) {
  return requestClient.get(`${Api.Prefix}/Task/${id}`);
}
// 添加项目任务
export function createTask(data: any) {
  return requestClient.post(`${Api.Prefix}/Task`, data);
}
// 修改项目任务
export function updateTask(data: any) {
  return requestClient.put(`${Api.Prefix}/Task/${data.id}`, data);
}

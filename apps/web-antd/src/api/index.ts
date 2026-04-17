export * as basic from './basic';
export * as businessflow from './businessflow';
export * as extend from './extend';
export * as imcenter from './imcenter';
export * as lowcodedev from './lowcodedev';
export * as permissionmgr from './permissionmgr';
export * as systemData from './systemData';
export * as systemmgr from './systemmgr';

// 导出常用API
export { loginApi, logoutApi, getUserInfoApi } from './basic/user';
export { getAccessCodesApi } from './basic/common';
export { getAllMenusApi } from './systemmgr/menu';

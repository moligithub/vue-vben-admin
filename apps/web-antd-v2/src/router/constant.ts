export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('/@/views/basic/exception/Exception.vue');

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue');

/**
 * @description: parent-layout
 */
/**
 * 创建一个返回 Promise 的函数，该 Promise 解析为一个包含布局名称的对象
 * @param {string} [_name] - 可选的布局名称，如果未提供则使用默认的 PARENT_LAYOUT_NAME
 * @returns {Promise<{name: string}>} 解析为包含布局名称对象的 Promise
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME,
      });
    });
};

import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

/**
 * 基础路由模块
 */
export default [
  {
    name: 'FormShortLink',
    path: '/formShortLink',
    component: () => import('#/views/common/formShortLink/index.vue'),
    meta: {
      title: '',
      hideInMenu: true,
      ignoreAuth: true,
    },
  },
  {
    name: 'Sso',
    path: '/sso',
    component: () => import('#/views/basic/login/sso-redirect.vue'),
    meta: {
      title: 'sso',
      hideMenu: true,
      ignoreAuth: true,
    },
  },
] as RouteRecordRaw[];

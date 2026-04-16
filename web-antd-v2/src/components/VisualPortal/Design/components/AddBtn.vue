<template>
  <div>
    <a-dropdown placement="bottom" trigger="click">
      <a-button preIcon="icon-bts icon-bts-btn-add">添加控件</a-button>
      <template #overlay>
        <a-menu triggerSubMenuAction="click">
          <a-sub-menu class="portal-menu-item" v-for="(item, index) in componentsList" :key="index">
            <template #title>
              <span class="flex items-center">
                <i :class="`${item.icon} mr-1`"></i>
                <span>{{ item.label }}</span>
              </span>
            </template>
            <a-menu-item v-for="it in item.list" @click="handleAddComponent(it)">
              <span class="flex items-center">
                <i :class="`${it.icon} mr-1`" />
                <span>{{ it.label }}</span>
              </span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script lang="ts" setup>
  import { layoutComponents, systemComponents, basicComponents, chartComponents } from '../helper/componentMap';

  const emit = defineEmits(['addComponent']);
  const componentsList = [
    { label: '布局控件', tsaDK: 'layout', icon: 'icon-bts icon-bts-generator-function', list: layoutComponents },
    { label: '基础控件', tsaDK: 'basic', icon: 'icon-bts icon-bts-tree-department', list: basicComponents },
    { label: '系统控件', tsaDK: 'system', icon: 'icon-bts icon-bts-tree-user2', list: systemComponents },
    { label: '图表控件', tsaDK: 'chart', icon: 'icon-bts icon-bts-file-photo', list: chartComponents },
  ];

  function handleAddComponent(val) {
    emit('addComponent', val);
  }
</script>
<style lang="less">
  .portal-menu-item {
    .ant-dropdown-menu-submenu-arrow {
      display: none !important;
    }
  }
</style>

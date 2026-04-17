<template>
  <div class="menu-detail">
    <a-modal
      v-model:open="visible"
      title="菜单详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="菜单名称">{{
          menuData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="菜单编码">{{
          menuData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="路由地址">{{
          menuData.path
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          menuData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          menuData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const menuData = reactive({
  fullName: '',
  enCode: '',
  path: '',
  sortCode: 0,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(menuData, data);
  }
}

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

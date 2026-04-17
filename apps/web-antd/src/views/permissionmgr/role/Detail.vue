<template>
  <div class="role-detail">
    <a-modal
      v-model:open="visible"
      title="角色详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="角色名称">{{
          roleData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="角色编码">{{
          roleData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="类型">{{
          roleData.type
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          roleData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          roleData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
        <a-descriptions-item label="说明">{{
          roleData.description
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const roleData = reactive({
  fullName: '',
  enCode: '',
  type: '',
  sortCode: 0,
  enabledMark: 1,
  description: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(roleData, data);
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

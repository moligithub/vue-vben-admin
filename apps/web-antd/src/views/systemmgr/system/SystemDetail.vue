<template>
  <div class="system-detail">
    <a-modal
      v-model:open="visible"
      title="系统详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="系统名称">{{
          systemData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="系统编码">{{
          systemData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          systemData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          systemData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
        <a-descriptions-item label="说明">{{
          systemData.description
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const systemData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  enabledMark: 1,
  description: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(systemData, data);
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

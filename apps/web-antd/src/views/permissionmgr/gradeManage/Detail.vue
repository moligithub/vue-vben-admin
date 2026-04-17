<template>
  <div class="grade-detail">
    <a-modal
      v-model:open="visible"
      title="级别详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="级别名称">{{
          gradeData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="级别编码">{{
          gradeData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          gradeData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          gradeData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
        <a-descriptions-item label="说明">{{
          gradeData.description
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const gradeData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  enabledMark: 1,
  description: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(gradeData, data);
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

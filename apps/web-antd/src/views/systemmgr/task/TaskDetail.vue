<template>
  <div class="task-detail">
    <a-modal
      v-model:open="visible"
      title="任务详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="任务名称">{{
          taskData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="任务编码">{{
          taskData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="Cron表达式">{{
          taskData.cronExpression
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          taskData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const taskData = reactive({
  fullName: '',
  enCode: '',
  cronExpression: '',
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(taskData, data);
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

<template>
  <div class="task-log-detail">
    <a-modal
      v-model:open="visible"
      title="任务日志详情"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="执行时间">{{
          logData.creatorTime
        }}</a-descriptions-item>
        <a-descriptions-item label="执行状态">{{
          logData.status
        }}</a-descriptions-item>
        <a-descriptions-item label="执行信息" :span="2">{{
          logData.message
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const logData = reactive({
  creatorTime: '',
  status: '',
  message: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(logData, data);
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

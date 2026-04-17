<template>
  <div class="log-detail">
    <a-modal
      v-model:open="visible"
      title="日志详情"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="日志标题">{{
          logData.title
        }}</a-descriptions-item>
        <a-descriptions-item label="日志类型">{{
          logData.logType
        }}</a-descriptions-item>
        <a-descriptions-item label="操作人">{{
          logData.operator
        }}</a-descriptions-item>
        <a-descriptions-item label="操作时间">{{
          logData.creatorTime
        }}</a-descriptions-item>
        <a-descriptions-item label="操作IP" :span="2">{{
          logData.ip
        }}</a-descriptions-item>
        <a-descriptions-item label="详细描述" :span="2">{{
          logData.description
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const logData = reactive({
  title: '',
  logType: '',
  operator: '',
  creatorTime: '',
  ip: '',
  description: '',
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

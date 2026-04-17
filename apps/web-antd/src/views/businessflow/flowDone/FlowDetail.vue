<template>
  <div class="flow-detail">
    <a-modal
      v-model:open="visible"
      title="流程详情"
      width="900px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="流程名称">{{
          flowData.flowName
        }}</a-descriptions-item>
        <a-descriptions-item label="流程标题">{{
          flowData.title
        }}</a-descriptions-item>
        <a-descriptions-item label="发起人">{{
          flowData.startUserName
        }}</a-descriptions-item>
        <a-descriptions-item label="完成时间">{{
          flowData.endTime
        }}</a-descriptions-item>
        <a-descriptions-item label="审批结果">{{
          flowData.result
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const flowData = reactive({
  flowName: '',
  title: '',
  startUserName: '',
  endTime: '',
  result: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(flowData, data);
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

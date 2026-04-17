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
        <a-descriptions-item label="发起时间">{{
          flowData.startTime
        }}</a-descriptions-item>
        <a-descriptions-item label="当前节点">{{
          flowData.currentNode
        }}</a-descriptions-item>
        <a-descriptions-item label="流程状态">{{
          flowData.status
        }}</a-descriptions-item>
      </a-descriptions>
      <a-divider>流程记录</a-divider>
      <a-timeline>
        <a-timeline-item
          v-for="item in flowData.records"
          :key="item.id"
          :color="item.color"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.description }}</p>
          <p>{{ item.time }}</p>
        </a-timeline-item>
      </a-timeline>
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
  startTime: '',
  currentNode: '',
  status: '',
  records: [] as any[],
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

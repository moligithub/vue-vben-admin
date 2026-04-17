<template>
  <div class="flow-monitor-detail">
    <a-modal
      v-model:open="visible"
      title="流程详情"
      width="900px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="流程名称">{{
          flowData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="流程编码">{{
          flowData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          flowData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{
          flowData.creatorTime
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const flowData = reactive({
  fullName: '',
  enCode: '',
  enabledMark: 1,
  creatorTime: '',
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

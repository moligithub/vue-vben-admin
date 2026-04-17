<template>
  <div class="entrust-detail">
    <a-modal
      v-model:open="visible"
      title="委托详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="委托流程">{{
          entrustData.flowName
        }}</a-descriptions-item>
        <a-descriptions-item label="被委托人">{{
          entrustData.toUserName
        }}</a-descriptions-item>
        <a-descriptions-item label="时间范围">{{
          entrustData.dateRange
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          entrustData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const entrustData = reactive({
  flowName: '',
  toUserName: '',
  dateRange: '',
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(entrustData, data);
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

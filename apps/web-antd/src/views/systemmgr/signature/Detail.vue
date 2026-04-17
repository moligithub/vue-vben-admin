<template>
  <div class="signature-detail">
    <a-modal
      v-model:open="visible"
      title="签章详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="签章名称">{{
          signatureData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="签章编码">{{
          signatureData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          signatureData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          signatureData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const signatureData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(signatureData, data);
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

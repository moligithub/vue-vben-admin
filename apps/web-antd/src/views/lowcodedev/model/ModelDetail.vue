<template>
  <div class="lowcodedev-model-detail">
    <a-modal
      v-model:open="visible"
      title="模型详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="模型名称">{{
          modelData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="模型编码">{{
          modelData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="表名">{{
          modelData.tableName
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          modelData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const modelData = reactive({
  fullName: '',
  enCode: '',
  tableName: '',
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(modelData, data);
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

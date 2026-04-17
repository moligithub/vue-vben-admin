<template>
  <div class="template-detail">
    <a-modal
      v-model:open="visible"
      title="模板详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="模板名称">{{
          templateData.templateName
        }}</a-descriptions-item>
        <a-descriptions-item label="模板编码">{{
          templateData.templateCode
        }}</a-descriptions-item>
        <a-descriptions-item label="模板内容">{{
          templateData.content
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const templateData = reactive({
  templateName: '',
  templateCode: '',
  content: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(templateData, data);
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

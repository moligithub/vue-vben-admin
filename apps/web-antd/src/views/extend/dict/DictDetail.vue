<template>
  <div class="extend-dict-detail">
    <a-modal
      v-model:open="visible"
      title="字典详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="字典名称">{{
          dictData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="字典编码">{{
          dictData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          dictData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          dictData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const dictData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(dictData, data);
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

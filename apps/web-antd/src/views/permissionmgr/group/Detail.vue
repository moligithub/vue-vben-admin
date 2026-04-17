<template>
  <div class="group-detail">
    <a-modal
      v-model:open="visible"
      title="分组详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="分组名称">{{
          groupData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="分组编码">{{
          groupData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          groupData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="说明">{{
          groupData.description
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const groupData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  description: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(groupData, data);
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

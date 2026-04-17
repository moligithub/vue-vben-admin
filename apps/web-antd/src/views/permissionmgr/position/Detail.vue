<template>
  <div class="position-detail">
    <a-modal
      v-model:open="visible"
      title="岗位详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="岗位名称">{{
          positionData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="岗位编码">{{
          positionData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="所属组织">{{
          positionData.organizeName
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          positionData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          positionData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const positionData = reactive({
  fullName: '',
  enCode: '',
  organizeName: '',
  sortCode: 0,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(positionData, data);
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

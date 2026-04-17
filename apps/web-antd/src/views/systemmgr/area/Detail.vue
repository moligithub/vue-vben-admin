<template>
  <div class="area-detail">
    <a-modal
      v-model:open="visible"
      title="地区详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="地区名称">{{
          areaData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="地区编码">{{
          areaData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="上级地区">{{
          areaData.parentName
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          areaData.sortCode
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const areaData = reactive({
  fullName: '',
  enCode: '',
  parentName: '',
  sortCode: 0,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(areaData, data);
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

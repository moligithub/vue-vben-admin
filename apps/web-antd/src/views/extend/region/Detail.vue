<template>
  <div class="extend-region-detail">
    <a-modal
      v-model:open="visible"
      title="地区详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="地区名称">{{
          regionData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="地区编码">{{
          regionData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          regionData.sortCode
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const regionData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(regionData, data);
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

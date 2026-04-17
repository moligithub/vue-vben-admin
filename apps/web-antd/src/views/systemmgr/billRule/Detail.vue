<template>
  <div class="billrule-detail">
    <a-modal
      v-model:open="visible"
      title="单据规则详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="规则名称">{{
          billruleData.fullName
        }}</a-descriptions-item>
        <a-descriptions-item label="规则编码">{{
          billruleData.enCode
        }}</a-descriptions-item>
        <a-descriptions-item label="排序">{{
          billruleData.sortCode
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          billruleData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const billruleData = reactive({
  fullName: '',
  enCode: '',
  sortCode: 0,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(billruleData, data);
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

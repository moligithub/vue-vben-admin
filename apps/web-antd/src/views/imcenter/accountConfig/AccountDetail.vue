<template>
  <div class="imcenter-account-detail">
    <a-modal
      v-model:open="visible"
      title="账号详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="账号类型">{{
          accountData.accountType
        }}</a-descriptions-item>
        <a-descriptions-item label="账号">{{
          accountData.account
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          accountData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const accountData = reactive({
  accountType: '',
  account: '',
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(accountData, data);
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

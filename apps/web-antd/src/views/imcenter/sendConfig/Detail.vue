<template>
  <div class="send-detail">
    <a-modal
      v-model:open="visible"
      title="发送详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="接收人">{{
          sendData.receiver
        }}</a-descriptions-item>
        <a-descriptions-item label="发送时间">{{
          sendData.creatorTime
        }}</a-descriptions-item>
        <a-descriptions-item label="发送内容" :span="2">{{
          sendData.content
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const sendData = reactive({
  receiver: '',
  content: '',
  creatorTime: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(sendData, data);
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

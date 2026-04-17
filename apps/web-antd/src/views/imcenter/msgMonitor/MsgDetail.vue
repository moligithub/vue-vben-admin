<template>
  <div class="imcenter-msg-detail">
    <a-modal
      v-model:open="visible"
      title="消息详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="接收人">{{
          msgData.receiver
        }}</a-descriptions-item>
        <a-descriptions-item label="消息类型">{{
          getMsgTypeText(msgData.msgType)
        }}</a-descriptions-item>
        <a-descriptions-item label="发送时间">{{
          msgData.creatorTime
        }}</a-descriptions-item>
        <a-descriptions-item label="消息内容">{{
          msgData.content
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const msgData = reactive({
  receiver: '',
  msgType: 1,
  content: '',
  creatorTime: '',
});

function getMsgTypeText(type: number) {
  if (type === 1) return '邮件';
  if (type === 2) return '短信';
  if (type === 3) return '微信';
  return '未知';
}

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(msgData, data);
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

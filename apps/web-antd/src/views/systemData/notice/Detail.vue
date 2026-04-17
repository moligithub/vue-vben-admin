<template>
  <div class="systemdata-notice-detail">
    <a-modal
      v-model:open="visible"
      title="通知详情"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="标题">{{
          noticeData.title
        }}</a-descriptions-item>
        <a-descriptions-item label="类型">{{
          noticeData.noticeType === 1 ? '通知' : '公告'
        }}</a-descriptions-item>
        <a-descriptions-item label="发布时间">{{
          noticeData.creatorTime
        }}</a-descriptions-item>
        <a-descriptions-item label="发布人">{{
          noticeData.creatorUser
        }}</a-descriptions-item>
        <a-descriptions-item label="内容" :span="2">{{
          noticeData.content
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const noticeData = reactive({
  title: '',
  noticeType: 1,
  content: '',
  creatorTime: '',
  creatorUser: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(noticeData, data);
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

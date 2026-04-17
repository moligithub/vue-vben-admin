<template>
  <div class="user-detail">
    <a-modal
      v-model:open="visible"
      title="用户详情"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="账号">{{
          userData.account
        }}</a-descriptions-item>
        <a-descriptions-item label="姓名">{{
          userData.realName
        }}</a-descriptions-item>
        <a-descriptions-item label="性别">{{
          userData.gender
        }}</a-descriptions-item>
        <a-descriptions-item label="手机">{{
          userData.mobilePhone
        }}</a-descriptions-item>
        <a-descriptions-item label="邮箱">{{
          userData.email
        }}</a-descriptions-item>
        <a-descriptions-item label="所属组织">{{
          userData.organize
        }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{
          userData.enabledMark === 1 ? '启用' : '禁用'
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const userData = reactive({
  account: '',
  realName: '',
  gender: '',
  mobilePhone: '',
  email: '',
  organize: '',
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(userData, data);
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

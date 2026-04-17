<template>
  <div class="account-config">
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane key="email" tab="邮件配置" />
      <a-tab-pane key="sms" tab="短信配置" />
      <a-tab-pane key="wx" tab="微信配置" />
      <a-tab-pane key="webhook" tab="Webhook配置" />
    </a-tabs>
    <div class="account-config-content">
      <p>账号配置 - 待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('email');
</script>

<style scoped>
.account-config {
  padding: 20px 0;
}

.account-config-content {
  padding: 40px;
  color: #999;
  text-align: center;
}
</style>

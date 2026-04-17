<template>
  <div class="imcenter-container">
    <div class="imcenter-header">
      <h1>通讯中心</h1>
    </div>
    <div class="imcenter-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="sendConfig" tab="发送配置" />
        <a-tab-pane key="msgTemplate" tab="消息模板" />
        <a-tab-pane key="msgMonitor" tab="消息监控" />
        <a-tab-pane key="accountConfig" tab="账号配置" />
      </a-tabs>
      <div class="imcenter-main">
        <SendConfig v-if="activeTab === 'sendConfig'" />
        <MsgTemplate v-else-if="activeTab === 'msgTemplate'" />
        <MsgMonitor v-else-if="activeTab === 'msgMonitor'" />
        <AccountConfig v-else-if="activeTab === 'accountConfig'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SendConfig from './sendConfig/index.vue';
import MsgTemplate from './msgTemplate/index.vue';
import MsgMonitor from './msgMonitor/index.vue';
import AccountConfig from './accountConfig/index.vue';

defineOptions({ name: 'ImCenter' });

const activeTab = ref('sendConfig');
</script>

<style scoped>
.imcenter-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.imcenter-header {
  margin-bottom: 16px;
}

.imcenter-header h1 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  background: white;
  border-radius: 8px;
}

.imcenter-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.imcenter-main {
  padding: 20px 0;
}
</style>

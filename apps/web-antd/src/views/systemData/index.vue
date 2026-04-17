<template>
  <div class="systemdata-container">
    <div class="systemdata-header">
      <h1>系统数据</h1>
    </div>
    <div class="systemdata-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="notice" tab="通知公告" />
        <a-tab-pane key="log" tab="系统日志" />
        <a-tab-pane key="monitor" tab="系统监控" />
      </a-tabs>
      <div class="systemdata-main">
        <NoticeManagement v-if="activeTab === 'notice'" />
        <LogManagement v-else-if="activeTab === 'log'" />
        <SystemMonitor v-else-if="activeTab === 'monitor'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NoticeManagement from './notice/index.vue';
import LogManagement from './log/index.vue';
import SystemMonitor from './monitor/index.vue';

defineOptions({ name: 'SystemData' });

const activeTab = ref('notice');
</script>

<style scoped>
.systemdata-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.systemdata-header {
  margin-bottom: 16px;
}

.systemdata-header h1 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  background: white;
  border-radius: 8px;
}

.systemdata-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.systemdata-main {
  padding: 20px 0;
}
</style>

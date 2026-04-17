<template>
  <div class="businessflow-container">
    <div class="businessflow-header">
      <h1>流程管理</h1>
    </div>
    <div class="businessflow-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="todo" tab="待办任务">
          <FlowTodo />
        </a-tab-pane>
        <a-tab-pane key="done" tab="已办任务">
          <FlowDone />
        </a-tab-pane>
        <a-tab-pane key="launch" tab="发起流程">
          <FlowLaunch />
        </a-tab-pane>
        <a-tab-pane key="monitor" tab="流程监控">
          <FlowMonitor />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FlowTodo from './flowTodo/index.vue';
import FlowDone from './flowDone/index.vue';
import FlowLaunch from './flowLaunch/index.vue';
import FlowMonitor from './flowMonitor/index.vue';

defineOptions({ name: 'BusinessFlow' });

const activeTab = ref('todo');
</script>

<style scoped>
.businessflow-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.businessflow-header {
  margin-bottom: 16px;
}

.businessflow-header h1 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  background: white;
  border-radius: 8px;
}

.businessflow-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

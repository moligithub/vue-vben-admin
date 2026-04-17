<template>
  <div class="system-mgr-container">
    <div class="system-mgr-header">
      <h1>系统管理</h1>
    </div>
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane key="menu" tab="菜单管理">
        <MenuManagement />
      </a-tab-pane>
      <a-tab-pane key="system" tab="系统管理">
        <SystemManagement />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuManagement from './menu/index.vue';
import SystemManagement from './system/index.vue';

defineOptions({ name: 'SystemMgr' });

const activeTab = ref('menu');
</script>

<style scoped>
.system-mgr-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.system-mgr-header {
  padding: 20px;
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
}

.system-mgr-header h1 {
  margin: 0;
  font-size: 18px;
}
</style>

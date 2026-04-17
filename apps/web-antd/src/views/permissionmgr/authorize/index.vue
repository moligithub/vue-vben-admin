<template>
  <div class="authorize-container">
    <div class="authorize-header">
      <h2>权限管理</h2>
    </div>
    <div class="authorize-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="module" tab="模块权限" />
        <a-tab-pane key="column" tab="列表权限" />
        <a-tab-pane key="form" tab="表单权限" />
        <a-tab-pane key="button" tab="按钮权限" />
        <a-tab-pane key="data" tab="数据权限" />
      </a-tabs>
      <div class="authorize-table">
        <p>权限配置页面 - 待完善</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('module');
</script>

<style scoped>
.authorize-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.authorize-header {
  margin-bottom: 16px;
}

.authorize-header h2 {
  margin: 0;
  font-size: 16px;
}

.authorize-content {
  background: white;
}

.authorize-table {
  padding: 20px;
}
</style>

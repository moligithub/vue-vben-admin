<template>
  <div class="sysconfig-container">
    <div class="sysconfig-header">
      <h3>系统配置</h3>
    </div>
    <div class="sysconfig-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="basic" tab="基础配置" />
        <a-tab-pane key="sync" tab="同步配置" />
      </a-tabs>
      <div class="sysconfig-form">
        <p>系统配置 - 待完善</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('basic');
</script>

<style scoped>
.sysconfig-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.sysconfig-header {
  margin-bottom: 16px;
}

.sysconfig-header h3 {
  margin: 0;
}

.sysconfig-content {
  margin-top: 16px;
}

.sysconfig-form {
  padding: 40px;
  color: #999;
  text-align: center;
}
</style>

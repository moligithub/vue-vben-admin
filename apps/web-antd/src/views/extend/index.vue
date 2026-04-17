<template>
  <div class="extend-container">
    <div class="extend-header">
      <h1>扩展管理</h1>
    </div>
    <div class="extend-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="region" tab="地区管理" />
        <a-tab-pane key="dict" tab="字典管理" />
        <a-tab-pane key="file" tab="文件管理" />
      </a-tabs>
      <div class="extend-table">
        <RegionManagement v-if="activeTab === 'region'" />
        <DictManagement v-else-if="activeTab === 'dict'" />
        <FileManagement v-else-if="activeTab === 'file'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RegionManagement from './region/index.vue';
import DictManagement from './dict/index.vue';
import FileManagement from './file/index.vue';

defineOptions({ name: 'Extend' });

const activeTab = ref('region');
</script>

<style scoped>
.extend-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.extend-header {
  margin-bottom: 16px;
}

.extend-header h1 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  background: white;
  border-radius: 8px;
}

.extend-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

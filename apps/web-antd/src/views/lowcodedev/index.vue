<template>
  <div class="lowcodedev-container">
    <div class="lowcodedev-header">
      <h1>低代码开发</h1>
    </div>
    <div class="lowcodedev-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="model" tab="数据模型" />
        <a-tab-pane key="form" tab="表单设计" />
        <a-tab-pane key="table" tab="表格设计" />
        <a-tab-pane key="visual" tab="可视化" />
      </a-tabs>
      <div class="lowcodedev-main">
        <p>低代码开发平台 - 待完善</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'LowCodeDev' });

const activeTab = ref('model');
</script>

<style scoped>
.lowcodedev-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.lowcodedev-header {
  margin-bottom: 16px;
}

.lowcodedev-header h1 {
  padding: 20px;
  margin: 0;
  font-size: 18px;
  background: white;
  border-radius: 8px;
}

.lowcodedev-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.lowcodedev-main {
  padding: 40px;
  color: #999;
  text-align: center;
}
</style>

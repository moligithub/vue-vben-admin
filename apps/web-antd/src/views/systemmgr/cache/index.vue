<template>
  <div class="cache-container">
    <div class="cache-header">
      <a-space>
        <a-button type="primary" @click="handleRefresh">刷新缓存</a-button>
        <a-button @click="handleClear">清空缓存</a-button>
      </a-space>
    </div>
    <div class="cache-info">
      <a-descriptions title="缓存信息" bordered :column="2">
        <a-descriptions-item label="缓存类型">Redis</a-descriptions-item>
        <a-descriptions-item label="缓存数量">0</a-descriptions-item>
        <a-descriptions-item label="最后刷新时间">-</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

function handleRefresh() {
  message.success('缓存已刷新');
}

function handleClear() {
  message.success('缓存已清空');
}
</script>

<style scoped>
.cache-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.cache-header {
  margin-bottom: 24px;
}

.cache-info {
  margin-top: 24px;
}
</style>

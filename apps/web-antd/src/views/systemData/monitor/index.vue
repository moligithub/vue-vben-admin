<template>
  <div class="monitor-container">
    <div class="monitor-header">
      <a-button @click="handleRefresh">刷新</a-button>
    </div>
    <div class="monitor-content">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card title="CPU使用率">
            <a-statistic :value="cpuUsage" suffix="%">
              <template #prefix>CPU</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="内存使用率">
            <a-statistic :value="memoryUsage" suffix="%">
              <template #prefix>MEM</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="磁盘使用率">
            <a-statistic :value="diskUsage" suffix="%">
              <template #prefix>DISK</template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="在线人数">
            <a-statistic :value="onlineUsers">
              <template #prefix>用户</template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const cpuUsage = ref(0);
const memoryUsage = ref(0);
const diskUsage = ref(0);
const onlineUsers = ref(0);

function handleRefresh() {
  fetchData();
}

function fetchData() {
  cpuUsage.value = Math.random() * 100;
  memoryUsage.value = Math.random() * 100;
  diskUsage.value = Math.random() * 100;
  onlineUsers.value = Math.floor(Math.random() * 100);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.monitor-container {
  padding: 20px 0;
}

.monitor-header {
  margin-bottom: 16px;
}

.monitor-content {
  margin-top: 16px;
}
</style>

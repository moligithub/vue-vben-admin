<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>欢迎回来，{{ userInfo?.userName || '用户' }}</h1>
      <p>今天是 {{ today }}</p>
    </div>
    <div class="stats-section">
      <div class="stat-card">
        <h3>待办事项</h3>
        <p class="stat-value">{{ todoCount }}</p>
      </div>
      <div class="stat-card">
        <h3>未读消息</h3>
        <p class="stat-value">{{ unreadCount }}</p>
      </div>
      <div class="stat-card">
        <h3>系统公告</h3>
        <p class="stat-value">{{ noticeCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@vben/stores';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const today = computed(() => {
  return new Date().toLocaleDateString('zh-CN');
});

const todoCount = ref(0);
const unreadCount = ref(0);
const noticeCount = ref(0);

onMounted(() => {
  todoCount.value = 5;
  unreadCount.value = 3;
  noticeCount.value = 2;
});
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.welcome-section {
  padding: 30px;
  margin-bottom: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.welcome-section h1 {
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
}

.welcome-section p {
  margin: 0;
  color: #666;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 20px;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.stat-card h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #666;
}

.stat-value {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #1890ff;
}
</style>

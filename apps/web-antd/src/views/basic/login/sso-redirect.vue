<template>
  <div class="sso-redirect">
    <a-spin tip="正在跳转..." :spinning="true">
      <p>正在跳转到系统...</p>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '#/store/auth';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      authStore.setAccessToken(token);
      await authStore.fetchUserInfo();
      router.push('/');
    } else {
      router.push('/auth/login');
    }
  } catch (error) {
    console.error('SSO登录失败:', error);
    router.push('/auth/login');
  }
});
</script>

<style scoped>
.sso-redirect {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
}
</style>

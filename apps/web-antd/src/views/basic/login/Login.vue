<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h1>系统登录</h1>
      </div>
      <LoginForm @login="handleLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import { useLogin } from './useLogin';

const { login } = useLogin();

const handleLogin = async (values: any) => {
  await login(values);
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
}

.login-header {
  margin-bottom: 30px;
  text-align: center;
}

.login-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}
</style>

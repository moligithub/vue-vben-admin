<template>
  <a-form
    :model="formState"
    :rules="rules"
    ref="formRef"
    @finish="handleFinish"
  >
    <a-form-item name="account" label="账号">
      <a-input v-model:value="formState.account" placeholder="请输入账号" />
    </a-form-item>
    <a-form-item name="password" label="密码">
      <a-input-password
        v-model:value="formState.password"
        placeholder="请输入密码"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" style="width: 100%">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const formRef = ref();
const formState = reactive({
  account: '',
  password: '',
});

const rules = {
  account: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
};

const emit = defineEmits(['login']);

const handleFinish = () => {
  emit('login', formState);
};
</script>

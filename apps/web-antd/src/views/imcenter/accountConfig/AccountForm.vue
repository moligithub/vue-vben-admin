<template>
  <div class="imcenter-account-form">
    <a-modal
      v-model:open="visible"
      title="账号配置"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="账号类型" name="accountType">
          <a-select v-model:value="formData.accountType" placeholder="请选择">
            <a-select-option value="email">邮件</a-select-option>
            <a-select-option value="sms">短信</a-select-option>
            <a-select-option value="weixin">微信</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="账号" name="account">
          <a-input v-model:value="formData.account" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formRef = ref();
const formData = reactive({
  accountType: 'email',
  account: '',
  password: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(formData, data);
  }
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

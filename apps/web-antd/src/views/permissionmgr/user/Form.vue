<template>
  <div class="user-form">
    <a-modal
      v-model:open="visible"
      :title="formTitle"
      width="800px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="账号" name="account">
              <a-input
                v-model:value="formData.account"
                placeholder="请输入账号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" name="realName">
              <a-input
                v-model:value="formData.realName"
                placeholder="请输入姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机" name="mobilePhone">
              <a-input
                v-model:value="formData.mobilePhone"
                placeholder="请输入手机号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱" name="email">
              <a-input
                v-model:value="formData.email"
                placeholder="请输入邮箱"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('新增用户');
const formRef = ref();
const formData = reactive({
  account: '',
  realName: '',
  mobilePhone: '',
  email: '',
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

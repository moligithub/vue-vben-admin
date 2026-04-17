<template>
  <div class="user-change-pwd">
    <a-modal
      v-model:open="visible"
      title="修改密码"
      width="400px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="原密码" name="oldPassword">
          <a-input-password
            v-model:value="formData.oldPassword"
            placeholder="请输入原密码"
          />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input-password
            v-model:value="formData.newPassword"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input-password
            v-model:value="formData.confirmPassword"
            placeholder="请确认新密码"
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
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

function openModal() {
  visible.value = true;
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

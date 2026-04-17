<template>
  <div class="reset-password">
    <a-modal
      v-model:open="visible"
      title="重置密码"
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
        <a-form-item label="账号">
          <span>{{ formData.account }}</span>
        </a-form-item>
        <a-form-item label="新密码" name="password">
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入新密码"
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
  id: '',
  account: '',
  password: '123456',
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

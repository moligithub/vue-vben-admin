<template>
  <div class="signature-form">
    <a-modal
      v-model:open="visible"
      :title="formTitle"
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
        <a-form-item label="签章名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入签章名称"
          />
        </a-form-item>
        <a-form-item label="签章编码" name="enCode">
          <a-input
            v-model:value="formData.enCode"
            placeholder="请输入签章编码"
          />
        </a-form-item>
        <a-form-item label="签章图片" name="file">
          <a-upload :before-upload="handleUpload" :max-count="1">
            <a-button>选择图片</a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="状态" name="enabledMark">
          <a-radio-group v-model:value="formData.enabledMark">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('新增签章');
const formRef = ref();
const formData = reactive({
  fullName: '',
  enCode: '',
  file: null as any,
  enabledMark: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(formData, data);
  }
}

function handleUpload(file: any) {
  formData.file = file;
  return false;
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

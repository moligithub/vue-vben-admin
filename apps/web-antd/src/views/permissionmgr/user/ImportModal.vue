<template>
  <div class="import-modal">
    <a-modal
      v-model:open="visible"
      title="导入"
      width="500px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="下载模板">
          <a-button type="link" @click="handleDownload"
            >点击下载导入模板</a-button
          >
        </a-form-item>
        <a-form-item label="上传文件">
          <a-upload :before-upload="handleUpload" :max-count="1">
            <a-button>选择文件</a-button>
          </a-upload>
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
  file: null as any,
});

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleDownload() {
  console.log('下载模板');
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

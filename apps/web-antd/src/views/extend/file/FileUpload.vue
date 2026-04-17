<template>
  <div class="file-upload">
    <a-modal
      v-model:open="visible"
      title="上传文件"
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
        <a-form-item label="文件分类" name="fileType">
          <a-select v-model:value="formData.fileType" placeholder="请选择">
            <a-select-option value="doc">文档</a-select-option>
            <a-select-option value="image">图片</a-select-option>
            <a-select-option value="video">视频</a-select-option>
            <a-select-option value="other">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择文件">
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
  fileType: 'doc',
  file: null as any,
});

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
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

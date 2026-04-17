<template>
  <div class="user-update-avatar">
    <a-modal
      v-model:open="visible"
      title="修改头像"
      width="400px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <div class="avatar-upload">
        <a-upload :before-upload="handleUpload" :show-upload-list="false">
          <a-button>选择图片</a-button>
        </a-upload>
        <div v-if="avatarUrl" class="avatar-preview">
          <img :src="avatarUrl" alt="avatar" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const avatarUrl = ref('');

function openModal() {
  visible.value = true;
}

function handleUpload(file: any) {
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
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

<style scoped>
.avatar-upload {
  text-align: center;
}

.avatar-preview {
  margin-top: 16px;
}

.avatar-preview img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>

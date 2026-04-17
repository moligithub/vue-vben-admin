<template>
  <div class="print-preview">
    <a-modal
      v-model:open="visible"
      title="打印预览"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="preview-content">
        <p>打印预览内容 - 待完善</p>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

<style scoped>
.preview-content {
  min-height: 400px;
  padding: 20px;
  background: white;
}
</style>

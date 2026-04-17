<template>
  <div class="form-short-link-form">
    <div class="form-content">
      <p>表单加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FormShortLinkForm' });

interface Props {
  config?: any;
  modelId?: string;
  isPreview?: boolean;
}

const props = defineProps<Props>();
</script>

<style scoped>
.form-short-link-form {
  padding: 20px;
}

.form-content {
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

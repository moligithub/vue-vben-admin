<template>
  <div class="lowcodedev-form-design">
    <div class="form-design-header">
      <a-button type="primary" @click="handleSave">保存</a-button>
      <a-button @click="handlePreview">预览</a-button>
    </div>
    <div class="form-design-content">
      <p>表单设计器 - 待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FormDesign' });

function handleSave() {
  console.log('保存');
}

function handlePreview() {
  console.log('预览');
}
</script>

<style scoped>
.form-design-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.form-design-content {
  min-height: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

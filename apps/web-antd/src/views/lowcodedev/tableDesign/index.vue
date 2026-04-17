<template>
  <div class="lowcodedev-table-design">
    <div class="table-design-header">
      <a-button type="primary" @click="handleSave">保存</a-button>
    </div>
    <div class="table-design-content">
      <p>表格设计器 - 待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TableDesign' });

function handleSave() {
  console.log('保存');
}
</script>

<style scoped>
.table-design-header {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.table-design-content {
  min-height: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

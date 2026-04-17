<template>
  <div class="icons-container">
    <div class="icons-header">
      <h3>图标库</h3>
    </div>
    <div class="icons-content">
      <p>图标选择器 - 待完善</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Icons' });
</script>

<style scoped>
.icons-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.icons-header {
  margin-bottom: 16px;
}

.icons-header h3 {
  margin: 0;
}

.icons-content {
  padding: 40px;
  color: #999;
  text-align: center;
}
</style>

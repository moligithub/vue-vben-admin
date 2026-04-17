<template>
  <div class="area-tree">
    <div class="area-tree-header">
      <a-button type="primary" @click="handleAdd">新增地区</a-button>
    </div>
    <div class="area-tree-content">
      <a-tree :tree-data="treeData" @select="handleSelect"> </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const treeData = ref<any[]>([]);

function handleAdd() {
  console.log('新增地区');
}

function handleSelect(keys: any, info: any) {
  console.log('选中', keys, info);
}
</script>

<style scoped>
.area-tree {
  padding: 20px;
}

.area-tree-header {
  margin-bottom: 16px;
}

.area-tree-content {
  padding: 16px;
  background: white;
  border-radius: 8px;
}
</style>

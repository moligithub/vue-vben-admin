<template>
  <div class="menu-tree">
    <div class="menu-tree-header">
      <a-button type="primary" @click="handleAdd">新增菜单</a-button>
    </div>
    <div class="menu-tree-content">
      <a-tree :tree-data="treeData" @select="handleSelect"> </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TreeNode {
  key: string;
  title: string;
  children?: TreeNode[];
}

const treeData = ref<TreeNode[]>([]);

function handleAdd() {
  console.log('新增菜单');
}

function handleSelect(keys: any, info: any) {
  console.log('选中', keys, info);
}
</script>

<style scoped>
.menu-tree {
  padding: 20px;
}

.menu-tree-header {
  margin-bottom: 16px;
}

.menu-tree-content {
  padding: 16px;
  background: white;
  border-radius: 8px;
}
</style>

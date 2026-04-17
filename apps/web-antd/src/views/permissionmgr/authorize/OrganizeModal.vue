<template>
  <div class="authorize-organize">
    <a-modal
      v-model:open="visible"
      title="选择组织"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-tree :tree-data="treeData" @select="handleSelect"> </a-tree>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const treeData = ref<any[]>([]);

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleSelect(keys: any, info: any) {
  console.log('选中', keys, info);
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

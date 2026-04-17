<template>
  <div class="role-permission">
    <a-modal
      v-model:open="visible"
      title="权限设置"
      width="800px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <p>角色权限配置 - 待完善</p>
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

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

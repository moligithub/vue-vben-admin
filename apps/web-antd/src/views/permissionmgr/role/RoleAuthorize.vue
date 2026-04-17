<template>
  <div class="role-authorize">
    <a-modal
      v-model:open="visible"
      title="角色权限"
      width="800px"
      @ok="handleOk"
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

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

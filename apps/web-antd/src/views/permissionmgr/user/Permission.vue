<template>
  <div class="user-permission">
    <a-modal
      v-model:open="visible"
      title="查看权限"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>用户权限信息 - 待完善</p>
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

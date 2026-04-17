<template>
  <div class="authorize-detail">
    <a-modal
      v-model:open="visible"
      title="权限详情"
      width="600px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>权限详情 - 待完善</p>
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

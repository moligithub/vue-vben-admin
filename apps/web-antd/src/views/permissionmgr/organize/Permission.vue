<template>
  <div class="permission-popup">
    <a-modal
      v-model:open="visible"
      :title="'查看权限 - ' + title"
      width="900px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>权限配置 - 待完善</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const title = ref('');

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    title.value = data.fullName || '';
  }
}

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

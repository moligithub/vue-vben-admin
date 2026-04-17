<template>
  <div class="socials-bind">
    <a-modal
      v-model:open="visible"
      title="绑定管理"
      width="500px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <p>社交账号绑定 - 待完善</p>
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

<template>
  <div class="user-bind-account">
    <a-modal
      v-model:open="visible"
      title="绑定账号"
      width="400px"
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

function openModal() {
  visible.value = true;
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

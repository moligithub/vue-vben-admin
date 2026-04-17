<template>
  <div class="transfer-modal">
    <a-modal
      v-model:open="visible"
      title="转移"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-transfer
        :data-source="mockData"
        :target-keys="targetKeys"
        :render="(item) => item.title"
        @change="handleChange"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const mockData = ref<any[]>([]);
const targetKeys = ref<string[]>([]);

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleChange(keys: string[]) {
  targetKeys.value = keys;
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

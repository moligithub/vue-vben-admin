<template>
  <div class="flow-quick-launch-form">
    <a-modal
      v-model:open="visible"
      title="快速发起"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="选择流程" name="flowId">
          <a-select v-model:value="formData.flowId" placeholder="请选择流程">
          </a-select>
        </a-form-item>
        <a-form-item label="流程标题" name="title">
          <a-input
            v-model:value="formData.title"
            placeholder="请输入流程标题"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formRef = ref();
const formData = reactive({
  flowId: '',
  title: '',
});

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

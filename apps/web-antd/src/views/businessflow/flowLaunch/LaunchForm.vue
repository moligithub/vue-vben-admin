<template>
  <div class="flow-launch-form">
    <a-modal
      v-model:open="visible"
      title="发起流程"
      width="800px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="流程名称" name="flowName">
          <a-input v-model:value="formData.flowName" disabled />
        </a-form-item>
        <a-form-item label="流程标题" name="title">
          <a-input
            v-model:value="formData.title"
            placeholder="请输入流程标题"
          />
        </a-form-item>
        <a-form-item label="优先级" name="priority">
          <a-select v-model:value="formData.priority" placeholder="请选择">
            <a-select-option :value="1">普通</a-select-option>
            <a-select-option :value="2">重要</a-select-option>
            <a-select-option :value="3">紧急</a-select-option>
          </a-select>
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
  flowName: '',
  flowId: '',
  title: '',
  priority: 1,
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    Object.assign(formData, data);
  }
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

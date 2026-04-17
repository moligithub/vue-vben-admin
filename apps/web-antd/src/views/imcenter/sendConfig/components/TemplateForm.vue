<template>
  <div class="imcenter-send-config-components">
    <div class="template-form">
      <a-modal
        v-model:open="visible"
        title="模板表单"
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
          <a-form-item label="模板名称" name="templateName">
            <a-input
              v-model:value="formData.templateName"
              placeholder="请输入模板名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formRef = ref();
const formData = reactive({
  templateName: '',
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

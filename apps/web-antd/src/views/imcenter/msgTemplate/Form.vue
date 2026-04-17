<template>
  <div class="template-form">
    <a-modal
      v-model:open="visible"
      :title="formTitle"
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
        <a-form-item label="模板名称" name="templateName">
          <a-input
            v-model:value="formData.templateName"
            placeholder="请输入模板名称"
          />
        </a-form-item>
        <a-form-item label="模板编码" name="templateCode">
          <a-input
            v-model:value="formData.templateCode"
            placeholder="请输入模板编码"
          />
        </a-form-item>
        <a-form-item label="模板内容" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="4"
            placeholder="请输入模板内容"
          />
        </a-form-item>
        <a-form-item label="状态" name="enabledMark">
          <a-radio-group v-model:value="formData.enabledMark">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('新增模板');
const formRef = ref();
const formData = reactive({
  templateName: '',
  templateCode: '',
  content: '',
  enabledMark: 1,
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

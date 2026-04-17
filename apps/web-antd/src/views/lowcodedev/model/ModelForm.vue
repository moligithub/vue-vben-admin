<template>
  <div class="lowcodedev-model-form">
    <a-modal
      v-model:open="visible"
      :title="formTitle"
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
        <a-form-item label="模型名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入模型名称"
          />
        </a-form-item>
        <a-form-item label="模型编码" name="enCode">
          <a-input
            v-model:value="formData.enCode"
            placeholder="请输入模型编码"
          />
        </a-form-item>
        <a-form-item label="表名" name="tableName">
          <a-input
            v-model:value="formData.tableName"
            placeholder="请输入表名"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('新增模型');
const formRef = ref();
const formData = reactive({
  fullName: '',
  enCode: '',
  tableName: '',
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

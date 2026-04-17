<template>
  <div class="billrule-form">
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
        <a-form-item label="规则名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入规则名称"
          />
        </a-form-item>
        <a-form-item label="规则编码" name="enCode">
          <a-input
            v-model:value="formData.enCode"
            placeholder="请输入规则编码"
          />
        </a-form-item>
        <a-form-item label="流水号格式" name="format">
          <a-input
            v-model:value="formData.format"
            placeholder="如: YYYYMMDD0001"
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
const formTitle = ref('新增单据规则');
const formRef = ref();
const formData = reactive({
  fullName: '',
  enCode: '',
  format: '',
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

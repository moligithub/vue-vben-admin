<template>
  <div class="send-form">
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
        <a-form-item label="配置名称" name="configName">
          <a-input
            v-model:value="formData.configName"
            placeholder="请输入配置名称"
          />
        </a-form-item>
        <a-form-item label="配置类型" name="configType">
          <a-select v-model:value="formData.configType" placeholder="请选择">
            <a-select-option value="email">邮件</a-select-option>
            <a-select-option value="sms">短信</a-select-option>
            <a-select-option value="weixin">微信</a-select-option>
          </a-select>
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
const formTitle = ref('新增配置');
const formRef = ref();
const formData = reactive({
  configName: '',
  configType: 'email',
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

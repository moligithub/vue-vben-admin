<template>
  <div class="sysconfig-form">
    <a-modal
      v-model:open="visible"
      title="系统配置"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="配置项" name="configKey">
          <a-input
            v-model:value="formData.configKey"
            placeholder="请输入配置项"
          />
        </a-form-item>
        <a-form-item label="配置值" name="configValue">
          <a-textarea
            v-model:value="formData.configValue"
            :rows="3"
            placeholder="请输入配置值"
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
  configKey: '',
  configValue: '',
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

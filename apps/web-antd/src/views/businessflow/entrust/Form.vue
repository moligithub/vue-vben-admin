<template>
  <div class="flow-entrust-form">
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
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="选择流程" name="flowId">
          <a-select v-model:value="formData.flowId" placeholder="请选择流程">
          </a-select>
        </a-form-item>
        <a-form-item label="被委托人" name="toUserId">
          <a-select
            v-model:value="formData.toUserId"
            placeholder="请选择被委托人"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="时间范围" name="dateRange">
          <a-range-picker v-model:value="formData.dateRange" />
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
const formTitle = ref('新增委托');
const formRef = ref();
const formData = reactive({
  flowId: '',
  toUserId: '',
  dateRange: [] as any[],
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

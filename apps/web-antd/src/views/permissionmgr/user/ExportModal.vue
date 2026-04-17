<template>
  <div class="export-modal">
    <a-modal
      v-model:open="visible"
      title="导出"
      width="400px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="导出范围">
          <a-radio-group v-model:value="formData.range">
            <a-radio value="all">全部</a-radio>
            <a-radio value="current">当前页</a-radio>
            <a-radio value="selected">选中</a-radio>
          </a-radio-group>
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
  range: 'all',
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

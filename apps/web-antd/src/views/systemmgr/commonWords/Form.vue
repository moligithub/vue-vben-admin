<template>
  <div class="commonwords-form">
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
        <a-form-item label="用语名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入用语名称"
          />
        </a-form-item>
        <a-form-item label="用语内容" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="4"
            placeholder="请输入用语内容"
          />
        </a-form-item>
        <a-form-item label="排序" name="sortCode">
          <a-input-number
            v-model:value="formData.sortCode"
            :min="0"
            style="width: 100%"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('新增常用语');
const formRef = ref();
const formData = reactive({
  fullName: '',
  content: '',
  sortCode: 0,
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

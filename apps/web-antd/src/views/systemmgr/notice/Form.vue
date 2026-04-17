<template>
  <div class="notice-form">
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
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formData.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="类型" name="noticeType">
          <a-radio-group v-model:value="formData.noticeType">
            <a-radio :value="1">通知</a-radio>
            <a-radio :value="2">公告</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="内容" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="4"
            placeholder="请输入内容"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const formTitle = ref('发布通知');
const formRef = ref();
const formData = reactive({
  title: '',
  noticeType: 1,
  content: '',
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

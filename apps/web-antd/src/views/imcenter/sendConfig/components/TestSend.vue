<template>
  <div class="test-send">
    <a-modal
      v-model:open="visible"
      title="测试发送"
      width="500px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="接收人" name="receiver">
          <a-input
            v-model:value="formData.receiver"
            placeholder="请输入接收人"
          />
        </a-form-item>
        <a-form-item label="发送内容" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="4"
            placeholder="请输入发送内容"
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
  receiver: '',
  content: '',
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

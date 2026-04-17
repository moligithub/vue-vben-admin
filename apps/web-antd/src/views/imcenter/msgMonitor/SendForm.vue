<template>
  <div class="imcenter-send-form">
    <a-modal
      v-model:open="visible"
      title="发送消息"
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
        <a-form-item label="接收人" name="receiver">
          <a-input
            v-model:value="formData.receiver"
            placeholder="请输入接收人"
          />
        </a-form-item>
        <a-form-item label="消息类型" name="msgType">
          <a-select v-model:value="formData.msgType" placeholder="请选择">
            <a-select-option value="1">邮件</a-select-option>
            <a-select-option value="2">短信</a-select-option>
            <a-select-option value="3">微信</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="消息内容" name="content">
          <a-textarea
            v-model:value="formData.content"
            :rows="4"
            placeholder="请输入消息内容"
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
  msgType: '1',
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

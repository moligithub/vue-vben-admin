<template>
  <div class="flow-approve">
    <a-modal
      v-model:open="visible"
      title="审批"
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
        <a-form-item label="审批结果" name="result">
          <a-radio-group v-model:value="formData.result">
            <a-radio value="agree">同意</a-radio>
            <a-radio value="reject">拒绝</a-radio>
            <a-radio value="transfer">转交</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="审批意见" name="comment">
          <a-textarea
            v-model:value="formData.comment"
            :rows="4"
            placeholder="请输入审批意见"
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
  result: 'agree',
  comment: '',
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

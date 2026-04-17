<template>
  <div class="work-handover-modal">
    <a-modal
      v-model:open="visible"
      title="工作交接"
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
        <a-form-item label="交接人">
          <a-select
            v-model:value="formData.toUserId"
            placeholder="请选择交接人"
          >
            <a-select-option value="">请选择</a-select-option>
          </a-select>
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
  userInfo: null as any,
  toUserId: '',
});

function openModal(data?: any) {
  visible.value = true;
  if (data) {
    formData.userInfo = data.userInfo;
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

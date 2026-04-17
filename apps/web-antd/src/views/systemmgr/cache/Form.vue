<template>
  <div class="cache-form">
    <a-modal
      v-model:open="visible"
      title="缓存配置"
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
        <a-form-item label="缓存类型">
          <a-select v-model:value="formData.cacheType" placeholder="请选择">
            <a-select-option value="redis">Redis</a-select-option>
            <a-select-option value="memory">内存</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="过期时间(秒)" name="expire">
          <a-input-number
            v-model:value="formData.expire"
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
const formRef = ref();
const formData = reactive({
  cacheType: 'redis',
  expire: 3600,
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

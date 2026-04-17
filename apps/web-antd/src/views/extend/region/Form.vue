<template>
  <div class="region-form">
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
        <a-form-item label="地区名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入地区名称"
          />
        </a-form-item>
        <a-form-item label="地区编码" name="enCode">
          <a-input
            v-model:value="formData.enCode"
            placeholder="请输入地区编码"
          />
        </a-form-item>
        <a-form-item label="上级地区" name="parentId">
          <a-tree-select
            v-model:value="formData.parentId"
            :tree-data="treeData"
            placeholder="请选择上级地区"
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
const formTitle = ref('新增地区');
const formRef = ref();
const formData = reactive({
  fullName: '',
  enCode: '',
  parentId: '',
  sortCode: 0,
});
const treeData = ref<any[]>([]);

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

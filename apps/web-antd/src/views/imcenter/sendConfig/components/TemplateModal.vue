<template>
  <div class="template-modal">
    <a-modal
      v-model:open="visible"
      title="选择模板"
      width="600px"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-table
        :columns="columns"
        :data-source="tableData"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
      </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const tableData = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  { title: '模板名称', dataIndex: 'templateName' },
  { title: '模板编码', dataIndex: 'templateCode' },
];

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

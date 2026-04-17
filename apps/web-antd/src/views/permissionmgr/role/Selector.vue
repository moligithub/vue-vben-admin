<template>
  <div class="role-selector">
    <a-modal
      v-model:open="visible"
      title="选择角色"
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
        @row-click="handleRowClick"
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
  { title: '角色名称', dataIndex: 'fullName' },
  { title: '角色编码', dataIndex: 'enCode' },
];

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
}

function handleRowClick(record: any) {
  console.log('选中', record);
}

function handleSubmit() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

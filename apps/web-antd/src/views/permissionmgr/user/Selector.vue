<template>
  <div class="user-selector">
    <a-modal
      v-model:open="visible"
      title="选择用户"
      width="800px"
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
  { title: '账号', dataIndex: 'account' },
  { title: '姓名', dataIndex: 'realName' },
  { title: '手机', dataIndex: 'mobilePhone' },
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

<template>
  <div class="imcenter-account-list">
    <div class="account-header">
      <a-button type="primary" @click="handleAdd">新增账号</a-button>
    </div>
    <div class="account-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'enabledMark'">
            <a-tag :color="record.enabledMark === 1 ? 'success' : 'error'">
              {{ record.enabledMark === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)"
                >编辑</a-button
              >
              <a-button
                type="link"
                size="small"
                danger
                @click="handleDelete(record)"
                >删除</a-button
              >
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';

interface AccountRecord {
  id?: string;
  accountType?: string;
  account?: string;
  enabledMark?: number;
}

const loading = ref(false);
const tableData = ref<AccountRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '账号类型', dataIndex: 'accountType', width: 150 },
  { title: '账号', dataIndex: 'account', width: 200 },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '操作', key: 'action', width: 150 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
}

function handleAdd() {
  console.log('新增账号');
}

function handleEdit(record: AccountRecord) {
  console.log('编辑', record);
}

function handleDelete(record: AccountRecord) {
  if (!record.id) return;
  message.success('删除成功');
}

function fetchData() {
  loading.value = true;
  setTimeout(() => {
    tableData.value = [];
    pagination.total = 0;
    loading.value = false;
  }, 500);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.imcenter-account-list {
  padding: 20px 0;
}

.account-header {
  margin-bottom: 16px;
}
</style>

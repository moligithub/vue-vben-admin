<template>
  <div class="signature-container">
    <div class="signature-header">
      <a-button type="primary" @click="handleAdd">新增签章</a-button>
    </div>
    <div class="signature-table">
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

interface SignatureRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  enabledMark?: number;
  sortCode?: number;
}

const loading = ref(false);
const tableData = ref<SignatureRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '签章名称', dataIndex: 'fullName', width: 200 },
  { title: '签章编码', dataIndex: 'enCode', width: 200 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '操作', key: 'action', width: 150 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('新增签章');
}

function handleEdit(record: SignatureRecord) {
  console.log('编辑', record);
}

function handleDelete(record: SignatureRecord) {
  if (!record.id) return;
  message.success('删除成功');
  fetchData();
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
.signature-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.signature-header {
  margin-bottom: 16px;
}
</style>

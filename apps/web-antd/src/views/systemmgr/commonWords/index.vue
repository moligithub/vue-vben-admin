<template>
  <div class="commonwords-container">
    <div class="commonwords-header">
      <a-button type="primary" @click="handleAdd">新增常用语</a-button>
    </div>
    <div class="commonwords-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
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

const loading = ref(false);
const tableData = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '用语名称', dataIndex: 'fullName', width: 200 },
  { title: '用语内容', dataIndex: 'content' },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  { title: '操作', key: 'action', width: 150 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('新增常用语');
}

function handleEdit(record: any) {
  console.log('编辑', record);
}

function handleDelete(record: any) {
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
.commonwords-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.commonwords-header {
  margin-bottom: 16px;
}
</style>

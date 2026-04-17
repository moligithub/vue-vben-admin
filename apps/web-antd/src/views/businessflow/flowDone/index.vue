<template>
  <div class="flow-done">
    <div class="flow-header">
      <a-form layout="inline" :model="filterForm">
        <a-form-item label="流程名称">
          <a-input
            v-model:value="filterForm.keyword"
            placeholder="请输入流程名称"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset"
            >重置</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div class="flow-table">
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
            <a-button type="link" size="small" @click="handleDetail(record)"
              >详情</a-button
            >
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

interface FlowRecord {
  id?: string;
  flowName?: string;
  title?: string;
  endTime?: string;
  result?: string;
  startUserName?: string;
}

const loading = ref(false);
const tableData = ref<FlowRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const filterForm = reactive({
  keyword: '',
});

const columns = [
  { title: '流程名称', dataIndex: 'flowName', width: 150 },
  { title: '任务标题', dataIndex: 'title' },
  { title: '发起人', dataIndex: 'startUserName', width: 100 },
  { title: '审批结果', dataIndex: 'result', width: 100 },
  { title: '完成时间', dataIndex: 'endTime', width: 180 },
  { title: '操作', key: 'action', width: 100 },
];

function handleSearch() {
  pagination.current = 1;
  fetchData();
}

function handleReset() {
  filterForm.keyword = '';
  pagination.current = 1;
  fetchData();
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleDetail(record: FlowRecord) {
  console.log('详情', record);
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
.flow-done {
  padding: 20px 0;
}

.flow-header {
  margin-bottom: 16px;
}
</style>

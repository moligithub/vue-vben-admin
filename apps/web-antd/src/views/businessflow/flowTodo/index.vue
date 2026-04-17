<template>
  <div class="flow-todo">
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
          <template v-if="column.key === 'priority'">
            <a-tag :color="getPriorityColor(record.priority)">{{
              getPriorityText(record.priority)
            }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" size="small" @click="handleApprove(record)"
              >审批</a-button
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
  startTime?: string;
  priority?: number;
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
  { title: '优先级', dataIndex: 'priority', width: 80, key: 'priority' },
  { title: '发起时间', dataIndex: 'startTime', width: 180 },
  { title: '操作', key: 'action', width: 100 },
];

function getPriorityColor(priority: number) {
  if (priority === 1) return 'success';
  if (priority === 2) return 'warning';
  return 'error';
}

function getPriorityText(priority: number) {
  if (priority === 1) return '普通';
  if (priority === 2) return '重要';
  return '紧急';
}

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

function handleApprove(record: FlowRecord) {
  console.log('审批', record);
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
.flow-todo {
  padding: 20px 0;
}

.flow-header {
  margin-bottom: 16px;
}
</style>

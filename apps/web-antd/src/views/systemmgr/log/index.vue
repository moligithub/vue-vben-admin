<template>
  <div class="log-container">
    <div class="log-header">
      <a-form layout="inline" :model="filterForm">
        <a-form-item label="日志类型">
          <a-select
            v-model:value="filterForm.logType"
            placeholder="请选择"
            style="width: 150px"
            allowClear
          >
            <a-select-option value="1">操作日志</a-select-option>
            <a-select-option value="2">登录日志</a-select-option>
            <a-select-option value="3">异常日志</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="关键词">
          <a-input
            v-model:value="filterForm.keyword"
            placeholder="请输入关键词"
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
    <div class="log-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'logType'">
            <a-tag :color="getLogTypeColor(record.logType)">{{
              getLogTypeText(record.logType)
            }}</a-tag>
          </template>
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

interface LogRecord {
  id?: string;
  title?: string;
  logType?: number;
  operator?: string;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<LogRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const filterForm = reactive({
  logType: undefined as string | undefined,
  keyword: '',
});

const columns = [
  { title: '日志标题', dataIndex: 'title' },
  { title: '类型', dataIndex: 'logType', width: 100, key: 'logType' },
  { title: '操作人', dataIndex: 'operator', width: 120 },
  { title: '操作时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 100 },
];

function getLogTypeColor(type: number) {
  if (type === 1) return 'blue';
  if (type === 2) return 'green';
  return 'red';
}

function getLogTypeText(type: number) {
  if (type === 1) return '操作日志';
  if (type === 2) return '登录日志';
  return '异常日志';
}

function handleSearch() {
  pagination.current = 1;
  fetchData();
}

function handleReset() {
  filterForm.logType = undefined;
  filterForm.keyword = '';
  pagination.current = 1;
  fetchData();
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleDetail(record: LogRecord) {
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
.log-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.log-header {
  margin-bottom: 16px;
}
</style>

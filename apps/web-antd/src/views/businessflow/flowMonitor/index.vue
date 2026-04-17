<template>
  <div class="flow-monitor">
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
          <template v-if="column.key === 'enabledMark'">
            <a-tag :color="record.enabledMark === 1 ? 'success' : 'error'">
              {{ record.enabledMark === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleDetail(record)"
                >详情</a-button
              >
              <a-button type="link" size="small" @click="handleDesign(record)"
                >设计</a-button
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

interface FlowRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  enabledMark?: number;
  creatorTime?: string;
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
  { title: '流程名称', dataIndex: 'fullName', width: 200 },
  { title: '流程编码', dataIndex: 'enCode', width: 200 },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '创建时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 150 },
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

function handleDesign(record: FlowRecord) {
  console.log('设计', record);
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
.flow-monitor {
  padding: 20px 0;
}

.flow-header {
  margin-bottom: 16px;
}
</style>

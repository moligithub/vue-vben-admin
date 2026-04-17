<template>
  <div class="flow-launch">
    <div class="flow-header">
      <a-button type="primary" @click="handleStart">发起流程</a-button>
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
            <a-button type="link" size="small" @click="handleStart(record)"
              >发起</a-button
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
  fullName?: string;
  enCode?: string;
  description?: string;
}

const loading = ref(false);
const tableData = ref<FlowRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '流程名称', dataIndex: 'fullName', width: 200 },
  { title: '流程编码', dataIndex: 'enCode', width: 200 },
  { title: '说明', dataIndex: 'description' },
  { title: '操作', key: 'action', width: 100 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleStart(record?: FlowRecord) {
  console.log('发起流程', record);
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
.flow-launch {
  padding: 20px 0;
}

.flow-header {
  margin-bottom: 16px;
}
</style>

<template>
  <div class="msg-monitor">
    <div class="msg-monitor-header">
      <a-form layout="inline" :model="filterForm">
        <a-form-item label="消息类型">
          <a-select
            v-model:value="filterForm.msgType"
            placeholder="请选择"
            style="width: 150px"
            allowClear
          >
            <a-select-option value="1">邮件</a-select-option>
            <a-select-option value="2">短信</a-select-option>
            <a-select-option value="3">微信</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="filterForm.status"
            placeholder="请选择"
            style="width: 150px"
            allowClear
          >
            <a-select-option value="1">成功</a-select-option>
            <a-select-option value="2">失败</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset"
            >重置</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div class="msg-monitor-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'msgType'">
            <a-tag>{{ getMsgTypeText(record.msgType) }}</a-tag>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 1 ? 'success' : 'error'">
              {{ record.status === 1 ? '成功' : '失败' }}
            </a-tag>
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

interface MonitorRecord {
  id?: string;
  msgType?: number;
  receiver?: string;
  title?: string;
  status?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<MonitorRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const filterForm = reactive({
  msgType: undefined as string | undefined,
  status: undefined as string | undefined,
});

const columns = [
  { title: '接收人', dataIndex: 'receiver', width: 150 },
  { title: '标题', dataIndex: 'title' },
  { title: '消息类型', dataIndex: 'msgType', width: 100, key: 'msgType' },
  { title: '状态', dataIndex: 'status', width: 80, key: 'status' },
  { title: '发送时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 100 },
];

function getMsgTypeText(type: number) {
  if (type === 1) return '邮件';
  if (type === 2) return '短信';
  if (type === 3) return '微信';
  return '未知';
}

function handleSearch() {
  pagination.current = 1;
  fetchData();
}

function handleReset() {
  filterForm.msgType = undefined;
  filterForm.status = undefined;
  pagination.current = 1;
  fetchData();
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleDetail(record: MonitorRecord) {
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
.msg-monitor {
  padding: 20px 0;
}

.msg-monitor-header {
  margin-bottom: 16px;
}
</style>

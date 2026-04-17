<template>
  <div class="task-container">
    <div class="task-header">
      <a-button type="primary" @click="handleAdd">新增任务</a-button>
    </div>
    <div class="task-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">{{
              getStatusText(record.status)
            }}</a-tag>
          </template>
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
              <a-button type="link" size="small" @click="handleLog(record)"
                >日志</a-button
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

interface TaskRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  status?: number;
  enabledMark?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<TaskRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '任务名称', dataIndex: 'fullName', width: 200 },
  { title: '任务编码', dataIndex: 'enCode', width: 200 },
  { title: '状态', dataIndex: 'status', width: 100, key: 'status' },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '创建时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 200 },
];

function getStatusColor(status: number) {
  if (status === 1) return 'success';
  if (status === 2) return 'processing';
  if (status === 3) return 'error';
  return 'default';
}

function getStatusText(status: number) {
  if (status === 1) return '运行中';
  if (status === 2) return '已停止';
  if (status === 3) return '异常';
  return '未知';
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('新增任务');
}

function handleEdit(record: TaskRecord) {
  console.log('编辑', record);
}

function handleLog(record: TaskRecord) {
  console.log('日志', record);
}

function handleDelete(record: TaskRecord) {
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
.task-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.task-header {
  margin-bottom: 16px;
}
</style>

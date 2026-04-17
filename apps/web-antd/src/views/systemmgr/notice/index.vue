<template>
  <div class="notice-container">
    <div class="notice-header">
      <a-button type="primary" @click="handleAdd">发布通知</a-button>
    </div>
    <div class="notice-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'noticeType'">
            <a-tag>{{ getNoticeTypeText(record.noticeType) }}</a-tag>
          </template>
          <template v-if="column.key === 'enabledMark'">
            <a-tag :color="record.enabledMark === 1 ? 'success' : 'error'">
              {{ record.enabledMark === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleView(record)"
                >查看</a-button
              >
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

interface NoticeRecord {
  id?: string;
  title?: string;
  noticeType?: number;
  enabledMark?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<NoticeRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '标题', dataIndex: 'title' },
  { title: '类型', dataIndex: 'noticeType', width: 100, key: 'noticeType' },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '发布时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 200 },
];

function getNoticeTypeText(type: number) {
  if (type === 1) return '通知';
  if (type === 2) return '公告';
  return '未知';
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('发布通知');
}

function handleView(record: NoticeRecord) {
  console.log('查看', record);
}

function handleEdit(record: NoticeRecord) {
  console.log('编辑', record);
}

function handleDelete(record: NoticeRecord) {
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
.notice-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.notice-header {
  margin-bottom: 16px;
}
</style>

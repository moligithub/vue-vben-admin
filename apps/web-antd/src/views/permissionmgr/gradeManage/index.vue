<template>
  <div class="grade-container">
    <div class="grade-header">
      <a-button type="primary" @click="handleAdd">新增级别</a-button>
    </div>
    <div class="grade-table">
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
import {
  getGradeList,
  createGrade,
  updateGrade,
  delGrade,
} from '#/api/permissionmgr/gradeManage';

interface GradeRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  enabledMark?: number;
  sortCode?: number;
  description?: string;
}

const loading = ref(false);
const tableData = ref<GradeRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '级别名称', dataIndex: 'fullName', width: 200 },
  { title: '级别编码', dataIndex: 'enCode', width: 200 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  {
    title: '状态',
    dataIndex: 'enabledMark',
    width: 70,
    align: 'center' as const,
    key: 'enabledMark',
  },
  { title: '说明', dataIndex: 'description' },
  { title: '操作', key: 'action', width: 150 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getGradeList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取级别列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('新增级别');
}

function handleEdit(record: GradeRecord) {
  console.log('编辑级别', record);
}

function handleDelete(record: GradeRecord) {
  if (!record.id) return;
  delGrade(record.id).then((res: any) => {
    if (res.success) {
      message.success('删除成功');
      fetchData();
    }
  });
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.grade-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.grade-header {
  margin-bottom: 16px;
}
</style>

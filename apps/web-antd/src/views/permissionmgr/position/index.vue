<template>
  <div class="position-container">
    <div class="position-header">
      <a-button type="primary" @click="handleAdd">新增岗位</a-button>
    </div>
    <div class="position-table">
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
  getPositionList,
  createPosition,
  updatePosition,
  delPosition,
} from '#/api/permissionmgr/position';

interface PositionRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  enabledMark?: number;
  sortCode?: number;
  description?: string;
  organizeId?: string;
  organizeName?: string;
}

const loading = ref(false);
const tableData = ref<PositionRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '岗位名称', dataIndex: 'fullName', width: 200 },
  { title: '岗位编码', dataIndex: 'enCode', width: 200 },
  { title: '所属组织', dataIndex: 'organizeName' },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  {
    title: '状态',
    dataIndex: 'enabledMark',
    width: 70,
    align: 'center' as const,
    key: 'enabledMark',
  },
  { title: '操作', key: 'action', width: 150 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getPositionList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取岗位列表失败:', error);
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
  console.log('新增岗位');
}

function handleEdit(record: PositionRecord) {
  console.log('编辑岗位', record);
}

function handleDelete(record: PositionRecord) {
  if (!record.id) return;
  delPosition(record.id).then((res: any) => {
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
.position-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.position-header {
  margin-bottom: 16px;
}
</style>

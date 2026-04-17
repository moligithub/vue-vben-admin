<template>
  <div class="group-container">
    <div class="group-header">
      <a-button type="primary" @click="handleAdd">新增分组</a-button>
    </div>
    <div class="group-table">
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
  getGroupList,
  createGroup,
  updateGroup,
  delGroup,
} from '#/api/permissionmgr/group';

interface GroupRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  sortCode?: number;
  description?: string;
}

const loading = ref(false);
const tableData = ref<GroupRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '分组名称', dataIndex: 'fullName', width: 200 },
  { title: '分组编码', dataIndex: 'enCode', width: 200 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  { title: '说明', dataIndex: 'description' },
  { title: '操作', key: 'action', width: 150 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getGroupList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取分组列表失败:', error);
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
  console.log('新增分组');
}

function handleEdit(record: GroupRecord) {
  console.log('编辑分组', record);
}

function handleDelete(record: GroupRecord) {
  if (!record.id) return;
  delGroup(record.id).then((res: any) => {
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
.group-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.group-header {
  margin-bottom: 16px;
}
</style>

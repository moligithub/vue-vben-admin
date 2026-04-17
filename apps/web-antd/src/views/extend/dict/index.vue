<template>
  <div class="dict-container">
    <div class="dict-header">
      <a-button type="primary" @click="handleAdd">新增字典</a-button>
    </div>
    <div class="dict-table">
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
              <a-button type="link" size="small" @click="handleItems(record)"
                >字典项</a-button
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
import { getDictionaryList, delDictionary } from '#/api/systemmgr/dictionary';

interface DictRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  enabledMark?: number;
  sortCode?: number;
}

const loading = ref(false);
const tableData = ref<DictRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '字典名称', dataIndex: 'fullName', width: 200 },
  { title: '字典编码', dataIndex: 'enCode', width: 200 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  {
    title: '状态',
    dataIndex: 'enabledMark',
    width: 70,
    align: 'center' as const,
    key: 'enabledMark',
  },
  { title: '操作', key: 'action', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getDictionaryList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取字典列表失败:', error);
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
  console.log('新增字典');
}

function handleEdit(record: DictRecord) {
  console.log('编辑字典', record);
}

function handleItems(record: DictRecord) {
  console.log('字典项', record);
}

function handleDelete(record: DictRecord) {
  if (!record.id) return;
  delDictionary(record.id).then((res: any) => {
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
.dict-container {
  padding: 20px 0;
}

.dict-header {
  margin-bottom: 16px;
}
</style>

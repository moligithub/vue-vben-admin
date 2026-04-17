<template>
  <div class="lowcodedev-model">
    <div class="model-header">
      <a-button type="primary" @click="handleAdd">新增模型</a-button>
    </div>
    <div class="model-table">
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
              <a-button type="link" size="small" @click="handleDesign(record)"
                >设计</a-button
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

interface ModelRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  tableName?: string;
  enabledMark?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<ModelRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '模型名称', dataIndex: 'fullName', width: 200 },
  { title: '模型编码', dataIndex: 'enCode', width: 200 },
  { title: '表名', dataIndex: 'tableName', width: 200 },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '创建时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 200 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
}

function handleAdd() {
  console.log('新增模型');
}

function handleEdit(record: ModelRecord) {
  console.log('编辑', record);
}

function handleDesign(record: ModelRecord) {
  console.log('设计', record);
}

function handleDelete(record: ModelRecord) {
  if (!record.id) return;
  message.success('删除成功');
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
.lowcodedev-model {
  padding: 20px 0;
}

.model-header {
  margin-bottom: 16px;
}
</style>

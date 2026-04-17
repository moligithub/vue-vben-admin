<template>
  <div class="send-config">
    <div class="send-config-header">
      <a-button type="primary" @click="handleAdd">新增配置</a-button>
    </div>
    <div class="send-config-table">
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
              <a-button type="link" size="small" @click="handleTest(record)"
                >测试</a-button
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

interface ConfigRecord {
  id?: string;
  configName?: string;
  configType?: string;
  enabledMark?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<ConfigRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '配置名称', dataIndex: 'configName', width: 200 },
  { title: '配置类型', dataIndex: 'configType', width: 150 },
  { title: '状态', dataIndex: 'enabledMark', width: 80, key: 'enabledMark' },
  { title: '创建时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 200 },
];

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  console.log('新增配置');
}

function handleEdit(record: ConfigRecord) {
  console.log('编辑', record);
}

function handleTest(record: ConfigRecord) {
  console.log('测试', record);
}

function handleDelete(record: ConfigRecord) {
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
.send-config {
  padding: 20px 0;
}

.send-config-header {
  margin-bottom: 16px;
}
</style>

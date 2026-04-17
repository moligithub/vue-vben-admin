<template>
  <div class="msg-template">
    <div class="msg-template-header">
      <a-button type="primary" @click="handleAdd">新增模板</a-button>
    </div>
    <div class="msg-template-table">
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
              <a-button type="link" size="small" @click="handleView(record)"
                >查看</a-button
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

interface TemplateRecord {
  id?: string;
  templateName?: string;
  templateCode?: string;
  enabledMark?: number;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<TemplateRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '模板名称', dataIndex: 'templateName', width: 200 },
  { title: '模板编码', dataIndex: 'templateCode', width: 200 },
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
  console.log('新增模板');
}

function handleEdit(record: TemplateRecord) {
  console.log('编辑', record);
}

function handleView(record: TemplateRecord) {
  console.log('查看', record);
}

function handleDelete(record: TemplateRecord) {
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
.msg-template {
  padding: 20px 0;
}

.msg-template-header {
  margin-bottom: 16px;
}
</style>

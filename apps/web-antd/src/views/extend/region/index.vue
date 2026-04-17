<template>
  <div class="region-container">
    <div class="region-header">
      <a-button type="primary" @click="handleAdd">新增地区</a-button>
    </div>
    <div class="region-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="false"
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
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { getAreaList, delArea } from '#/api/systemmgr/area';

interface AreaRecord {
  id?: string;
  parentId?: string;
  fullName?: string;
  enCode?: string;
  sortCode?: number;
}

const loading = ref(false);
const tableData = ref<AreaRecord[]>([]);

const columns = [
  { title: '地区名称', dataIndex: 'fullName' },
  { title: '地区编码', dataIndex: 'enCode', width: 200 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  { title: '操作', key: 'action', width: 150 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res: any = await getAreaList({});
    if (res.success) {
      tableData.value = res.data || [];
    }
  } catch (error) {
    console.error('获取地区列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function handleAdd() {
  console.log('新增地区');
}

function handleEdit(record: AreaRecord) {
  console.log('编辑地区', record);
}

function handleDelete(record: AreaRecord) {
  if (!record.id) return;
  delArea(record.id).then((res: any) => {
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
.region-container {
  padding: 20px 0;
}

.region-header {
  margin-bottom: 16px;
}
</style>

<template>
  <div class="file-container">
    <div class="file-header">
      <a-button type="primary" @click="handleUpload">上传文件</a-button>
    </div>
    <div class="file-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'fileSize'">
            {{ formatFileSize(record.fileSize) }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleDownload(record)"
                >下载</a-button
              >
              <a-button type="link" size="small" @click="handlePreview(record)"
                >预览</a-button
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
import { getFileList, delFile } from '#/api/basic/file';

interface FileRecord {
  id?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<FileRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '文件名', dataIndex: 'fileName' },
  { title: '文件大小', dataIndex: 'fileSize', width: 120, key: 'fileSize' },
  { title: '文件类型', dataIndex: 'fileType', width: 120 },
  { title: '上传时间', dataIndex: 'creatorTime', width: 180 },
  { title: '操作', key: 'action', width: 180 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getFileList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取文件列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function formatFileSize(size: number) {
  if (!size) return '-';
  if (size < 1024) return size + 'B';
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + 'KB';
  if (size < 1024 * 1024 * 1024)
    return (size / (1024 * 1024)).toFixed(2) + 'MB';
  return (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleUpload() {
  console.log('上传文件');
}

function handleDownload(record: FileRecord) {
  console.log('下载', record);
}

function handlePreview(record: FileRecord) {
  console.log('预览', record);
}

function handleDelete(record: FileRecord) {
  if (!record.id) return;
  delFile(record.id).then((res: any) => {
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
.file-container {
  padding: 20px 0;
}

.file-header {
  margin-bottom: 16px;
}
</style>

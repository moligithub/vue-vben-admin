<template>
  <div class="role-container">
    <div class="role-header">
      <a-button type="primary" @click="handleAdd">新增角色</a-button>
    </div>
    <div class="role-table">
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
              <a-dropdown>
                <a-button type="link" size="small">更多</a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item
                      key="permission"
                      @click="handlePermission(record)"
                      >权限设置</a-menu-item
                    >
                    <a-menu-item key="user" @click="handleAssignUser(record)"
                      >关联用户</a-menu-item
                    >
                  </a-menu>
                </template>
              </a-dropdown>
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
  getRoleList,
  createRole,
  updateRole,
  delRole,
} from '#/api/permissionmgr/role';

interface RoleRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  type?: number;
  enabledMark?: number;
  sortCode?: number;
  description?: string;
  creatorTime?: string;
}

const loading = ref(false);
const tableData = ref<RoleRecord[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const columns = [
  { title: '角色名称', dataIndex: 'fullName', width: 200 },
  { title: '角色编码', dataIndex: 'enCode', width: 200 },
  { title: '类型', dataIndex: 'type', width: 100, align: 'center' as const },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  {
    title: '状态',
    dataIndex: 'enabledMark',
    width: 70,
    align: 'center' as const,
    key: 'enabledMark',
  },
  { title: '创建时间', dataIndex: 'creatorTime', width: 150 },
  { title: '操作', key: 'action', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const params = { page: pagination.current, pageSize: pagination.pageSize };
    const res: any = await getRoleList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取角色列表失败:', error);
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
  console.log('新增角色');
}

function handleEdit(record: RoleRecord) {
  console.log('编辑角色', record);
}

function handleDelete(record: RoleRecord) {
  if (!record.id) return;
  delRole(record.id).then((res: any) => {
    if (res.success) {
      message.success('删除成功');
      fetchData();
    }
  });
}

function handlePermission(record: RoleRecord) {
  console.log('权限设置', record);
}

function handleAssignUser(record: RoleRecord) {
  console.log('关联用户', record);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.role-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.role-header {
  margin-bottom: 16px;
}
</style>

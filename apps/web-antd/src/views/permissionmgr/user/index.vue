<template>
  <div class="user-mgr-container">
    <div class="user-mgr-header">
      <h1>用户管理</h1>
      <div class="header-actions">
        <a-button type="primary" @click="handleAdd">新增用户</a-button>
        <a-button @click="handleExport">导出</a-button>
        <a-button @click="handleImport">导入</a-button>
        <a-button @click="handleSync">同步</a-button>
      </div>
    </div>
    <div class="user-mgr-filter">
      <a-form layout="inline" :model="filterForm">
        <a-form-item label="关键字">
          <a-input
            v-model:value="filterForm.keyword"
            placeholder="请输入关键字"
            @pressEnter="handleSearch"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="filterForm.enabledMark"
            placeholder="请选择"
            style="width: 120px"
            allowClear
          >
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="0">禁用</a-select-option>
            <a-select-option :value="2">锁定</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset"
            >重置</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div class="user-mgr-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        row-key="id"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'enabledMark'">
            <a-tag :color="getStatusColor(record.enabledMark)">
              {{ getStatusText(record.enabledMark) }}
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
                    <a-menu-item key="resetPwd" @click="handleResetPwd(record)"
                      >重置密码</a-menu-item
                    >
                    <a-menu-item
                      key="permission"
                      @click="handlePermission(record)"
                      >查看权限</a-menu-item
                    >
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model:open="formVisible"
      :title="formTitle"
      width="800px"
      @ok="handleFormSubmit"
      @cancel="formVisible = false"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="账号" name="account">
              <a-input
                v-model:value="formData.account"
                placeholder="请输入账号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" name="realName">
              <a-input
                v-model:value="formData.realName"
                placeholder="请输入姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机" name="mobilePhone">
              <a-input
                v-model:value="formData.mobilePhone"
                placeholder="请输入手机号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮箱" name="email">
              <a-input
                v-model:value="formData.email"
                placeholder="请输入邮箱"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="性别" name="gender">
              <a-select v-model:value="formData.gender" placeholder="请选择">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" name="enabledMark">
              <a-select
                v-model:value="formData.enabledMark"
                placeholder="请选择"
              >
                <a-select-option :value="1">启用</a-select-option>
                <a-select-option :value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import {
  getUserList,
  createUser,
  updateUser,
  delUser,
  resetUserPassword,
} from '#/api/permissionmgr/user';

interface UserRecord {
  id?: string;
  account?: string;
  realName?: string;
  gender?: string;
  mobilePhone?: string;
  email?: string;
  enabledMark?: number;
  organize?: string;
  creatorTime?: string;
  sortCode?: number;
}

const loading = ref(false);
const tableData = ref<UserRecord[]>([]);
const formVisible = ref(false);
const formTitle = ref('新增用户');
const formRef = ref();
const editingId = ref('');

const filterForm = reactive({
  keyword: '',
  enabledMark: undefined as number | undefined,
});

const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

const formData = reactive<UserRecord>({
  account: '',
  realName: '',
  gender: '',
  mobilePhone: '',
  email: '',
  enabledMark: 1,
});

const columns = [
  { title: '账号', dataIndex: 'account', width: 100 },
  { title: '姓名', dataIndex: 'realName', width: 100 },
  { title: '性别', dataIndex: 'gender', width: 60, align: 'center' as const },
  { title: '手机', dataIndex: 'mobilePhone', width: 120 },
  { title: '所属组织', dataIndex: 'organize' },
  { title: '创建时间', dataIndex: 'creatorTime', width: 150 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  {
    title: '状态',
    dataIndex: 'enabledMark',
    width: 70,
    align: 'center' as const,
    key: 'enabledMark',
  },
  { title: '操作', key: 'action', width: 200, fixed: 'right' as const },
];

function getStatusColor(status: number) {
  if (status === 1) return 'success';
  if (status === 2) return 'warning';
  return 'error';
}

function getStatusText(status: number) {
  if (status === 1) return '启用';
  if (status === 2) return '锁定';
  return '禁用';
}

async function fetchData() {
  loading.value = true;
  try {
    const params = {
      keyword: filterForm.keyword,
      enabledMark: filterForm.enabledMark,
      page: pagination.current,
      pageSize: pagination.pageSize,
    };
    const res: any = await getUserList(params);
    if (res.success) {
      tableData.value = res.data.list || [];
      pagination.total = res.data.total || 0;
    }
  } catch (error) {
    console.error('获取用户列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  pagination.current = 1;
  fetchData();
}

function handleReset() {
  filterForm.keyword = '';
  filterForm.enabledMark = undefined;
  pagination.current = 1;
  fetchData();
}

function handleTableChange(pag: any) {
  pagination.current = pag.current;
  pagination.pageSize = pag.pageSize;
  fetchData();
}

function handleAdd() {
  formTitle.value = '新增用户';
  editingId.value = '';
  Object.assign(formData, {
    account: '',
    realName: '',
    gender: '',
    mobilePhone: '',
    email: '',
    enabledMark: 1,
  });
  formVisible.value = true;
}

function handleEdit(record: UserRecord) {
  formTitle.value = '编辑用户';
  editingId.value = record.id || '';
  Object.assign(formData, record);
  formVisible.value = true;
}

async function handleFormSubmit() {
  try {
    if (editingId.value) {
      const res: any = await updateUser({ id: editingId.value, ...formData });
      if (res.success) {
        message.success('更新成功');
        formVisible.value = false;
        fetchData();
      }
    } else {
      const res: any = await createUser(formData);
      if (res.success) {
        message.success('创建成功');
        formVisible.value = false;
        fetchData();
      }
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
}

function handleDelete(record: UserRecord) {
  if (!record.id) return;
  delUser(record.id).then((res: any) => {
    if (res.success) {
      message.success('删除成功');
      fetchData();
    }
  });
}

function handleResetPwd(record: UserRecord) {
  if (!record.id) return;
  resetUserPassword({ id: record.id }).then((res: any) => {
    if (res.success) {
      message.success('密码已重置为123456');
    }
  });
}

function handlePermission(record: UserRecord) {
  console.log('查看权限', record);
}

function handleExport() {
  console.log('导出');
}

function handleImport() {
  console.log('导入');
}

function handleSync() {
  console.log('同步');
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.user-mgr-container {
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
}

.user-mgr-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
}

.user-mgr-header h1 {
  margin: 0;
  font-size: 18px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.user-mgr-filter {
  padding: 20px;
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
}

.user-mgr-table {
  padding: 20px;
  background: white;
  border-radius: 8px;
}
</style>

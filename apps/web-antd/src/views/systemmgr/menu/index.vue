<template>
  <div class="menu-mgmt-container">
    <div class="menu-mgmt-header">
      <a-button type="primary" @click="handleAdd">新增系统</a-button>
    </div>
    <div class="menu-mgmt-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'icon'">
            <i :class="record.icon + ' table-icon'" />
          </template>
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
              <a-button type="link" size="small" @click="handleMenu(record)"
                >菜单管理</a-button
              >
              <a-dropdown>
                <a-button type="link" size="small">更多</a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item
                      key="delete"
                      v-if="record.isMain !== 1"
                      @click="handleDelete(record)"
                      >删除</a-menu-item
                    >
                    <a-menu-item
                      key="portal"
                      v-if="!record.mainSystem"
                      @click="handlePortal(record)"
                      >门户管理</a-menu-item
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
      width="600px"
      @ok="handleFormSubmit"
      @cancel="formVisible = false"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="系统名称" name="fullName">
          <a-input
            v-model:value="formData.fullName"
            placeholder="请输入系统名称"
          />
        </a-form-item>
        <a-form-item label="系统编码" name="enCode">
          <a-input
            v-model:value="formData.enCode"
            placeholder="请输入系统编码"
          />
        </a-form-item>
        <a-form-item label="图标" name="icon">
          <a-input
            v-model:value="formData.icon"
            placeholder="请输入图标class"
          />
        </a-form-item>
        <a-form-item label="排序" name="sortCode">
          <a-input-number
            v-model:value="formData.sortCode"
            :min="0"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="状态" name="enabledMark">
          <a-radio-group v-model:value="formData.enabledMark">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="说明" name="description">
          <a-textarea
            v-model:value="formData.description"
            :rows="3"
            placeholder="请输入说明"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import {
  getSystemList,
  createSystem,
  updateSystem,
  delSystem,
} from '#/api/systemmgr/system';

interface SystemRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  icon?: string;
  sortCode?: number;
  enabledMark?: number;
  description?: string;
  isMain?: number;
  mainSystem?: boolean;
}

const loading = ref(false);
const tableData = ref<SystemRecord[]>([]);
const formVisible = ref(false);
const formTitle = ref('新增系统');
const formRef = ref();
const editingId = ref('');

const formData = reactive<SystemRecord>({
  fullName: '',
  enCode: '',
  icon: '',
  sortCode: 0,
  enabledMark: 1,
  description: '',
});

const columns = [
  { title: '应用名称', dataIndex: 'fullName', width: 200 },
  { title: '应用编码', dataIndex: 'enCode', width: 200 },
  { title: '说明', dataIndex: 'description' },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    align: 'center' as const,
    key: 'icon',
  },
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
    const res: any = await getSystemList({});
    if (res.success) {
      tableData.value = res.data || [];
    }
  } catch (error) {
    console.error('获取系统列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function handleAdd() {
  formTitle.value = '新增系统';
  editingId.value = '';
  Object.assign(formData, {
    fullName: '',
    enCode: '',
    icon: '',
    sortCode: 0,
    enabledMark: 1,
    description: '',
  });
  formVisible.value = true;
}

function handleEdit(record: SystemRecord) {
  formTitle.value = '编辑系统';
  editingId.value = record.id || '';
  Object.assign(formData, record);
  formVisible.value = true;
}

async function handleFormSubmit() {
  try {
    if (editingId.value) {
      const res: any = await updateSystem({ id: editingId.value, ...formData });
      if (res.success) {
        message.success('更新成功');
        formVisible.value = false;
        fetchData();
      }
    } else {
      const res: any = await createSystem(formData);
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

function handleDelete(record: SystemRecord) {
  if (!record.id) return;
  delSystem(record.id).then((res: any) => {
    if (res.success) {
      message.success('删除成功');
      fetchData();
    }
  });
}

function handleMenu(record: SystemRecord) {
  console.log('菜单管理', record);
}

function handlePortal(record: SystemRecord) {
  console.log('门户管理', record);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.menu-mgmt-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.menu-mgmt-header {
  margin-bottom: 16px;
}
</style>

<template>
  <div class="organize-container">
    <div class="organize-header">
      <a-dropdown>
        <a-button type="primary">
          新增
          <span style="margin-left: 8px">▼</span>
        </a-button>
        <template #overlay>
          <a-menu @click="handleAdd">
            <a-menu-item key="company">新建公司</a-menu-item>
            <a-menu-item key="department">新建部门</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="organize-table">
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        row-key="id"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'fullName'">
            <span :class="'mr-6px ' + record.icon">{{ record.fullName }}</span>
          </template>
          <template v-if="column.key === 'type'">
            {{ record.type === 'company' ? '公司' : '部门' }}
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
                    <a-menu-item key="member" @click="handleViewMember(record)"
                      >查看成员</a-menu-item
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { getOrganizeList, delOrganize } from '#/api/permissionmgr/organize';

interface OrganizeRecord {
  id?: string;
  fullName?: string;
  enCode?: string;
  icon?: string;
  type?: string;
  parentId?: string;
  sortCode?: number;
  creatorTime?: string;
  children?: OrganizeRecord[];
}

const loading = ref(false);
const tableData = ref<OrganizeRecord[]>([]);

const columns = [
  { title: '名称', dataIndex: 'fullName', key: 'fullName' },
  { title: '编码', dataIndex: 'enCode' },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    align: 'center' as const,
    key: 'type',
  },
  { title: '创建时间', dataIndex: 'creatorTime', width: 150 },
  { title: '排序', dataIndex: 'sortCode', width: 70, align: 'center' as const },
  { title: '操作', key: 'action', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res: any = await getOrganizeList({});
    if (res.success) {
      tableData.value = res.data || [];
    }
  } catch (error) {
    console.error('获取组织列表失败:', error);
  } finally {
    loading.value = false;
  }
}

function handleAdd({ key }: { key: string }) {
  console.log('新增', key);
}

function handleEdit(record: OrganizeRecord) {
  console.log('编辑', record);
}

function handleDelete(record: OrganizeRecord) {
  if (!record.id) return;
  delOrganize(record.id).then((res: any) => {
    if (res.success) {
      message.success('删除成功');
      fetchData();
    }
  });
}

function handleViewMember(record: OrganizeRecord) {
  console.log('查看成员', record);
}

function handlePermission(record: OrganizeRecord) {
  console.log('查看权限', record);
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.organize-container {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.organize-header {
  margin-bottom: 16px;
}

.mr-6px {
  margin-right: 6px;
}
</style>

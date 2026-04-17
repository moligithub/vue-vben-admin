<template>
  <div class="role-user">
    <a-modal
      v-model:open="visible"
      title="关联用户"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-table
        :columns="columns"
        :data-source="tableData"
        row-key="id"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button
              type="link"
              size="small"
              danger
              @click="handleRemove(record)"
              >移除</a-button
            >
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const tableData = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  { title: '账号', dataIndex: 'account', width: 150 },
  { title: '姓名', dataIndex: 'realName', width: 150 },
  { title: '手机', dataIndex: 'mobilePhone', width: 150 },
  { title: '操作', key: 'action', width: 100 },
];

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleRemove(record: any) {
  console.log('移除', record);
}

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

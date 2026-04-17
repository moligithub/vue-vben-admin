<template>
  <div class="send-results">
    <a-modal
      v-model:open="visible"
      title="发送结果"
      width="800px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-table
        :columns="columns"
        :data-source="results"
        row-key="id"
        :pagination="pagination"
      >
      </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const visible = ref(false);
const results = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  { title: '接收人', dataIndex: 'receiver', width: 150 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '发送时间', dataIndex: 'creatorTime', width: 180 },
  { title: '错误信息', dataIndex: 'errorMsg' },
];

function openModal(data?: any) {
  visible.value = true;
  console.log('data', data);
}

function handleOk() {
  visible.value = false;
}

function handleCancel() {
  visible.value = false;
}

defineExpose({ openModal });
</script>

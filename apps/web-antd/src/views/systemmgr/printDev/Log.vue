<template>
  <div class="print-log">
    <a-modal
      v-model:open="visible"
      title="打印日志"
      width="900px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-table
        :columns="columns"
        :data-source="logList"
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
const logList = ref<any[]>([]);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  { title: '打印时间', dataIndex: 'creatorTime', width: 180 },
  { title: '打印人', dataIndex: 'creatorUser', width: 120 },
  { title: '打印内容', dataIndex: 'content' },
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

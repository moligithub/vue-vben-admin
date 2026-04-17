<template>
  <div class="short-link-list">
    <div class="short-link-content">
      <p>列表加载中...</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  config?: any;
  modelId?: string;
  isPreview?: boolean;
}

defineProps<Props>();
</script>

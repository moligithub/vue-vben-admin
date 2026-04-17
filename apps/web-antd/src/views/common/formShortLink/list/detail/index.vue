<template>
  <div class="short-link-detail">
    <p>详情页面</p>
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

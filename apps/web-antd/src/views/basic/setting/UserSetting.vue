<template>
  <div class="user-setting">
    <div class="setting-header">
      <h3>个人设置</h3>
    </div>
    <div class="setting-content">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="base" tab="基本信息" />
        <a-tab-pane key="security" tab="安全设置" />
        <a-tab-pane key="account" tab="账号绑定" />
      </a-tabs>
      <div class="setting-form">
        <p>个人设置 - 待完善</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'UserSetting' });

const activeTab = ref('base');
</script>

<style scoped>
.user-setting {
  min-height: 100vh;
  padding: 24px;
  background: white;
}

.setting-header {
  margin-bottom: 24px;
}

.setting-header h3 {
  margin: 0;
}

.setting-form {
  padding: 40px;
  color: #999;
  text-align: center;
}
</style>

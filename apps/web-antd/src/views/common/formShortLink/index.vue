<template>
  <div class="form-short-link-wrapper">
    <component
      :is="currentView"
      :config="config"
      :modelId="modelId"
      :isPreview="isPreview"
      v-if="showPage"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, toRefs, markRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getConfigData } from '#/api/lowcodedev/shortLink';
import Form from './form/index.vue';
import List from './list/index.vue';
import { AesEncryption } from '#/utils/cipher';

interface State {
  currentView: any;
  showPage: boolean;
  isPreview: boolean;
  modelId: string;
  config: any;
  encryption: string;
}

defineOptions({ name: 'FormShortLink' });
const state = reactive<State>({
  currentView: '',
  showPage: false,
  isPreview: false,
  modelId: '',
  config: {},
  encryption: '',
});
const { currentView, showPage, isPreview, modelId, config } = toRefs(state);
const router = useRouter();
const route = useRoute();

function init() {
  if (!route.query.encryption) return;
  state.encryption = route.query.encryption as string;
  const aesEncryption = new AesEncryption({ useHex: true });
  const configStr = aesEncryption.decryptByAES(state.encryption);
  if (!configStr) return;
  const config = JSON.parse(configStr);
  state.modelId = config.modelId;
  if (!state.modelId) return;
  getConfig(config.type);
}

function getConfig(type: string) {
  getConfigData(state.modelId, state.encryption).then((res: any) => {
    if (res.code !== 0 || !res.data) {
      router.replace('/404');
      return;
    }
    state.config = { ...res.data, encryption: state.encryption };
    state.currentView = type === 'form' ? markRaw(Form) : markRaw(List);
    state.showPage = true;
  });
}

onMounted(() => {
  init();
});
</script>

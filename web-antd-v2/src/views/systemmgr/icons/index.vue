<template>
  <div class="tsa-content-wrapper icons-wrapper">
    <div class="tsa-content-wrapper-center">
      <div class="tsa-content-wrapper-search-box">
        <BasicForm class="search-form" @register="registerForm" @submit="handleSubmit" @reset="handleReset"></BasicForm>
      </div>
      <div class="tsa-content-wrapper-content bg-white">
        <a-tabs v-model:activeKey="activeKey" type="card" class="tsa-content-wrapper-tabs">
          <a-tab-pane key="1" tab="公共图标">
            <ScrollContainer>
              <a-row>
                <a-col :span="6" v-for="item in bstIconList" :key="item" @click="handleCopy('icon-bts ' + item)" :title="item" class="icon-item">
                  <i :class="'icon-bts ' + item" />
                  <span>{{ item }}</span>
                </a-col>
              </a-row>
            </ScrollContainer>
          </a-tab-pane>
          <a-tab-pane key="2" tab="更多图标">
            <ScrollContainer>
              <a-row>
                <a-col :span="6" v-for="item in bstCustomList" :key="item" @click="handleCopy('bts-custom ' + item)" :title="item" class="icon-item">
                  <i :class="'bts-custom ' + item" />
                  <span>{{ item }}</span>
                </a-col>
              </a-row>
            </ScrollContainer>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, toRefs, watch, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { bstIconJson } from '/@/components/Tsa/IconPicker/data/bstIcon';
  import { bstCustomJson } from '/@/components/Tsa/IconPicker/data/bstCustom';
  import { cloneDeep } from 'lodash-es';
  import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { ScrollContainer } from '/@/components/Container';

  const bstIcon = bstIconJson.glyphs.map(o => `icon-bts-${o.font_class}`);
  const bstCustom = bstCustomJson.glyphs.map(o => `bts-custom-${o.font_class}`);

  const { createMessage } = useMessage();
  const [registerForm, { resetFields }] = useForm({
    baseColProps: { span: 6 },
    showActionButtonGroup: true,
    showAdvancedButton: true,
    compact: true,
    schemas: [
      {
        field: 'keyword',
        label: '关键词',
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键词',
          submitOnPressEnter: true,
        },
      },
    ],
  });
  const state = reactive({
    activeKey: '1',
    keyword: '',
    bstIcon,
    bstCustom,
    bstIconList: [],
    bstCustomList: [],
  });
  const { activeKey, bstIconList, bstCustomList } = toRefs(state);

  watch(
    () => state.activeKey,
    () => {
      resetFields();
    },
  );

  function handleSubmit(values) {
    state.keyword = values?.keyword || '';
    handleSearch();
  }
  function handleReset() {
    state.keyword = '';
    handleSearch();
  }
  function handleSearch() {
    const key = state.activeKey === '1' ? 'bstIcon' : 'bstCustom';
    if (state.keyword) {
      state[key + 'List'] = state[key].filter(o => o.indexOf(state.keyword) > -1);
    } else {
      state[key + 'List'] = cloneDeep(state[key]);
    }
  }
  function handleCopy(item) {
    const { isSuccessRef } = useCopyToClipboard(item);
    unref(isSuccessRef) && createMessage.success('复制成功');
  }
  onMounted(() => {
    handleReset();
  });
</script>
<style lang="less" scoped>
  .icons-wrapper {
    .icon-item {
      padding: 0 10px;
      height: 40px;
      line-height: 38px;
      border: 1px dashed transparent;
      color: #6b7a99;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      i {
        font-size: 16px;
        line-height: 40px;
        margin-right: 14px;
        vertical-align: top;
      }

      span {
        line-height: 40px;
        vertical-align: top;
      }

      &:hover {
        border-color: @primary-color;

        i {
          font-size: 30px;
        }
      }
    }
  }
</style>

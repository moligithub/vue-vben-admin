<template>
  <a-collapse-panel key="1">
    <template #header>{{ getTitle() }}</template>
    <a-form-item v-if="!noStyleTypeList.includes(activeData.tsaDK)">
      <template #label>风格类型<BasicHelp v-if="!!getTipLabel()" :text="getTipLabel()" /></template>
      <tsa-select v-model:value="activeData.option.styleType" :options="getStyleTypeOptions" placeholder="请选择" showSearch @change="onStyleTypeChange" />
    </a-form-item>
    <template v-if="activeData.tsaDK == 'lineChart'">
      <a-form-item label="面积堆积">
        <a-switch v-model:checked="activeData.option.areaStyle" />
      </a-form-item>
      <a-form-item label="线条宽度">
        <a-slider v-model:value="activeData.option.seriesLineStyleWidth" :min="1" :max="20" />
      </a-form-item>
      <a-form-item label="点的大小" v-show="showType == 'pc'">
        <a-slider v-model:value="activeData.option.seriesSymbolRotate" :max="20" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'pieChart'">
      <a-form-item label="南丁格尔图" v-show="showType == 'pc' || activeData.option.styleType == 1">
        <a-switch v-model:checked="activeData.option.roseType" />
      </a-form-item>
      <a-form-item label="自动排序" v-show="showType == 'pc'">
        <a-switch v-model:checked="activeData.option.sortable" />
      </a-form-item>
      <a-form-item label="不展示零">
        <a-switch v-model:checked="activeData.option.showZero" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'radarChart'">
      <a-form-item label="指示器大小" v-show="showType == 'pc'">
        <a-input-number v-model:value="activeData.option.radarAxisNameFontSize" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="指示器加粗" v-show="showType == 'pc'">
        <a-switch v-model:checked="activeData.option.radarAxisNameFontWeight" />
      </a-form-item>
      <a-form-item label="指示器颜色">
        <tsa-color-picker v-model:value="activeData.option.radarAxisNameColor" size="small" />
      </a-form-item>
      <a-form-item label="区域透明度" v-show="showType == 'pc'">
        <a-slider v-model:value="activeData.option.seriesAreaStyleOpacity" :max="1" :step="0.1" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'mapChart'">
      <map-set :activeData="activeData" :mapOptions="mapOptions" :showType="showType" />
    </template>
    <template v-if="activeData.tsaDK == 'rankList'">
      <a-divider>列表字段</a-divider>
      <div class="options-list">
        <draggable v-model="activeData.option.columnOptions" :animation="300" group="selectItem" handle=".option-drag" itemKey="id">
          <template #item="{ element, index }">
            <div class="select-item">
              <div class="select-line-icon option-drag">
                <i class="icon-bts icon-bts-darg" />
              </div>
              <a-input v-model:value="element.label" placeholder="列名" />
              <a-input v-model:value="element.value" placeholder="字段" />
              <div class="close-btn select-line-icon" :class="{ 'opacity-50': activeData.option.columnOptions.length == 1 }" @click="handleDel(index)">
                <i class="icon-bts icon-bts-btn-clearn" />
              </div>
            </div>
          </template>
        </draggable>
        <div class="add-btn">
          <a-button type="link" preIcon="icon-bts icon-bts-btn-add" @click="addSelectItem">添加字段</a-button>
        </div>
      </div>
    </template>
    <template v-if="activeData.tsaDK == 'timeAxis'">
      <a-form-item>
        <template #label>标签布局<BasicHelp text="APP不支持所有交错类型，默认显示轴右侧" /></template>
        <tsa-select v-model:value="activeData.option.layout" :options="layoutStyleList" placeholder="请选择" showSearch />
      </a-form-item>
      <a-form-item label="排序">
        <tsa-radio v-model:value="activeData.option.sortable" :options="sortList" optionType="button" buttonStyle="solid" />
      </a-form-item>
      <a-form-item label="显示条数">
        <a-input-number v-model:value="activeData.option.showNumber" placeholder="请输入" min="0" :max="50" v-if="showType == 'pc'" />
        <a-input-number v-model:value="activeData.option.appShowNumber" placeholder="请输入" min="0" :max="50" v-else />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'text'">
      <a-form-item label="文本类型">
        <tsa-radio v-model:value="activeData.option.styleType" :options="textStyleList" optionType="button" buttonStyle="solid" @change="textChange" />
      </a-form-item>
      <a-form-item label="数据类型">
        <tsa-radio v-model:value="activeData.dataType" :options="dataTypeList" optionType="button" buttonStyle="solid" @change="dataTypeChange" />
      </a-form-item>
      <a-form-item label="文本内容" v-if="activeData.dataType == 'static'">
        <a-input v-if="activeData.option.styleType == 1" v-model:value="activeData.option.defaultValue" placeholder="请输入" />
        <A-button v-if="activeData.option.styleType == 2" @click="showEditor()">设置</A-button>
      </a-form-item>
      <template v-else>
        <a-form-item label="数据接口">
          <interface-modal :value="activeData.propsApi" :title="activeData.propsName" popupTitle="数据接口" @change="onPropsApiChange" />
        </a-form-item>
        <a-form-item label="参数设置" v-if="activeData.templateJson?.length">
          <select-interface-btn :templateJson="activeData.templateJson" :showSystemFormId="false" :type="2" />
        </a-form-item>
        <Refresh v-if="activeData.propsApi" :refresh="activeData.refresh" />
      </template>
      <template v-if="activeData.option.styleType != 2">
        <a-form-item label="文本大小">
          <a-input-number v-model:value="activeData.option.textFontSize" :min="12" :max="25" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="文本加粗">
          <a-switch v-model:checked="activeData.option.textFontWeight" />
        </a-form-item>
        <a-form-item label="文本斜体">
          <a-switch v-model:checked="activeData.option.textFontStyle" />
        </a-form-item>
        <a-form-item label="文本颜色">
          <tsa-color-picker v-model:value="activeData.option.textFontColor" size="small" />
        </a-form-item>
        <a-form-item label="文本位置">
          <tsa-radio v-model:value="activeData.option.textLeft" :options="alignList" optionType="button" buttonStyle="solid" class="right-radio" />
        </a-form-item>
        <a-form-item label="文本下划线">
          <tsa-radio v-model:value="activeData.option.textUnderLine" :options="underLineList" optionType="button" buttonStyle="solid" />
        </a-form-item>
      </template>
      <a-form-item label="文本滚动" v-if="activeData.option.styleType != '2'">
        <a-switch v-model:checked="activeData.option.textAutoplay" />
      </a-form-item>
      <template v-if="activeData.option.textAutoplay && activeData.option.styleType != '2'">
        <a-form-item label="滚动方向" v-if="showType == 'pc'">
          <tsa-radio
            v-model:value="activeData.option.textAutoplayMode"
            :options="textAutoplayModeList"
            optionType="button"
            buttonStyle="solid"
            @change="renderKeyChange" />
        </a-form-item>
        <a-form-item label="滚动速度">
          <a-input-number v-model:value="activeData.option.textAutoplaySpeed" :min="10" :max="100" @change="renderKeyChange" />
        </a-form-item>
      </template>
      <a-form-item label="背景色">
        <tsa-color-picker v-model:value="activeData.option.textBgColor" size="small" />
      </a-form-item>
      <Link :activeData="activeData" :menuList="menuList" :appMenuList="appMenuList" :showType="showType" />
    </template>
    <template v-if="activeData.tsaDK == 'image'">
      <a-form-item label="图片来源">
        <tsa-radio
          v-model:value="activeData.option.styleType"
          :options="imageStyleList"
          optionType="button"
          buttonStyle="solid"
          @change="onStyleTypeChange"
          class="right-radio-more" />
      </a-form-item>
      <a-form-item label="上传图片" v-if="activeData.option.styleType == 1">
        <TsaUploadImgSingle v-model:value="activeData.option.defaultValue" />
      </a-form-item>
      <a-form-item v-else-if="activeData.option.styleType == 2">
        <template #label>图片地址<BasicHelp text="地址以http://或https://为开头" /></template>
        <a-input v-model:value="activeData.option.defaultValue" placeholder="请输入" />
      </a-form-item>
      <template v-else>
        <a-form-item label="数据接口">
          <interface-modal :value="activeData.propsApi" :title="activeData.propsName" popupTitle="数据接口" @change="onPropsApiChange" />
        </a-form-item>
        <a-form-item label="参数设置" v-if="activeData.templateJson?.length">
          <select-interface-btn :templateJson="activeData.templateJson" :showSystemFormId="false" :type="2" />
        </a-form-item>
        <Refresh v-if="activeData.propsApi" :refresh="activeData.refresh" />
      </template>
      <a-form-item label="填充方式">
        <tsa-select v-model:value="activeData.option.imageFillStyle" :options="fillStyleList" placeholder="请选择" showSearch />
      </a-form-item>
      <a-form-item label="文本内容">
        <a-input v-model:value="activeData.option.textDefaultValue" placeholder="请输入" />
      </a-form-item>
      <TextSet :activeData="activeData" />
      <Link :activeData="activeData" :menuList="menuList" :appMenuList="appMenuList" :showType="showType" />
    </template>
    <template v-if="activeData.tsaDK == 'carousel'">
      <a-form-item label="轮播图方向" v-show="showType == 'pc'">
        <tsa-radio
          v-model:value="activeData.option.carouselDirection"
          :options="directionList"
          optionType="button"
          buttonStyle="solid"
          @change="renderKeyChange" />
      </a-form-item>
      <a-form-item label="自动轮播">
        <a-switch v-model:checked="activeData.option.carouselAutoplay" />
      </a-form-item>
      <a-form-item label="轮播间隔">
        <a-input-number v-model:value="activeData.option.carouselInterval" placeholder="请输入" :min="500" :max="500000" addon-after="ms" />
      </a-form-item>
      <a-form-item label="指示点显示">
        <tsa-radio
          v-model:value="activeData.option.carouselIndicatorPosition"
          :options="indicatorPositionList"
          optionType="button"
          buttonStyle="solid"
          :fieldNames="{ label: activeData.option.carouselDirection == 'horizontal' ? 'label' : 'title' }" />
      </a-form-item>
      <template v-if="showType == 'pc'">
        <a-form-item label="箭头显示" v-if="activeData.option.carouselDirection == 'horizontal'">
          <tsa-radio v-model:value="activeData.option.carouselArrow" :options="arrowList" optionType="button" buttonStyle="solid" />
        </a-form-item>
      </template>
      <a-form-item label="3D效果" v-if="showType == 'app'">
        <a-switch v-model:checked="activeData.option.carouselType" />
      </a-form-item>
      <a-form-item label="选项">
        <a-button @click="openCarousel">设置</a-button>
      </a-form-item>
      <Refresh
        :refresh="activeData.refresh"
        v-show="activeData.option[showType == 'pc' ? 'defaultValue' : 'appDefaultValue'].find(ele => ele.dataType === 3)" />
      <a-form-item label="填充方式">
        <tsa-select v-model:value="activeData.option.imageFillStyle" :options="fillStyleList" placeholder="请选择" showSearch />
      </a-form-item>
      <CarouselModal @register="registerCarousel" @change="handleRefreshData" />
      <text-set :activeData="activeData" />
    </template>
    <template v-if="activeData.tsaDK == 'video'">
      <a-form-item label="视频来源">
        <tsa-radio
          v-model:value="activeData.option.styleType"
          :options="videoStyleList"
          optionType="button"
          buttonStyle="solid"
          @change="onStyleTypeChange"
          class="right-radio-more" />
      </a-form-item>
      <a-form-item label="上传视频" v-if="activeData.option.styleType == '1'">
        <TsaUploadFile v-model:value="fileList" :limit="1" buttonText="上传视频" accept="video/*" fileSize="100" @change="onUploadFileChange" />
      </a-form-item>
      <a-form-item v-else-if="activeData.option.styleType == 2">
        <template #label>视频地址<BasicHelp text="地址以http://或https://开头" /></template>
        <a-input v-model:value="activeData.option.defaultValue" placeholder="请输入" />
      </a-form-item>
      <template v-else>
        <a-form-item label="数据接口">
          <interface-modal :value="activeData.propsApi" :title="activeData.propsName" popupTitle="数据接口" @change="onPropsApiChange" />
        </a-form-item>
        <a-form-item label="参数设置" v-if="activeData.templateJson?.length">
          <select-interface-btn :templateJson="activeData.templateJson" :showSystemFormId="false" :type="2" />
        </a-form-item>
        <Refresh v-if="activeData.dataType === 'dynamic' && activeData.propsApi" :refresh="activeData.refresh" />
      </template>
      <a-form-item label="自动播放">
        <a-switch v-model:checked="activeData.option.videoAutoplay" />
      </a-form-item>
      <a-form-item label="播放频率">
        <tsa-radio v-model:value="activeData.option.playNumber" :options="playNumberList" optionType="button" buttonStyle="solid" class="right-radio-more" />
      </a-form-item>
      <a-form-item label="静音播放">
        <a-switch v-model:checked="activeData.option.mutePlay" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'iframe'">
      <a-form-item>
        <template #label>链接地址<BasicHelp text="地址以http://或https://为开头" /></template>
        <a-input v-model:value="activeData.option.defaultValue" placeholder="请输入" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'todo'">
      <template v-if="showType == 'app'">
        <a-form-item label="风格类型">
          <tsa-select v-model:value="activeData.option.styleType" :options="appTodoStyleList" placeholder="请选择" showSearch />
        </a-form-item>
        <template v-if="activeData.option.styleType == 2">
          <a-form-item label="每行选项数">
            <a-input-number v-model:value="activeData.option.appRowNumber" placeholder="请输入" :min="1" :max="10" />
          </a-form-item>
          <a-form-item label="显示边框">
            <a-switch v-model:checked="activeData.option.appShowBorder" />
          </a-form-item>
        </template>
      </template>
      <template v-else>
        <a-form-item label="每行选项数">
          <a-input-number v-model:value="activeData.option.rowNumber" placeholder="请输入" :min="1" :max="10" />
        </a-form-item>
        <a-form-item label="显示边框">
          <a-switch v-model:checked="activeData.option.showBorder" />
        </a-form-item>
      </template>
      <a-form-item label="选项">
        <a-button @click="openTodo">设置</a-button>
      </a-form-item>
      <Refresh :refresh="activeData.refresh" />
      <todo-modal @register="registerTodo" @change="handleRefresh" />
      <a-form-item label="名称大小">
        <a-input-number v-model:value="activeData.option.labelFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="名称加粗">
        <a-switch v-model:checked="activeData.option.labelFontWeight" />
      </a-form-item>
      <a-form-item label="名称颜色">
        <tsa-color-picker v-model:value="activeData.option.labelFontColor" size="small" />
      </a-form-item>
      <a-form-item label="数值大小">
        <a-input-number v-model:value="activeData.option.valueFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="数值加粗">
        <a-switch v-model:checked="activeData.option.valueFontWeight" />
      </a-form-item>
      <a-form-item label="数值颜色">
        <tsa-color-picker v-model:value="activeData.option.valueFontColor" size="small" />
      </a-form-item>
      <a-form-item label="数值背景色" v-if="showType == 'app'">
        <tsa-color-picker v-model:value="activeData.option.valueFontBgColor" size="small" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'commonFunc'">
      <template v-if="showType == 'app'">
        <a-form-item label="风格类型">
          <tsa-select v-model:value="activeData.option.appStyleType" :options="appTodoStyleList" placeholder="请选择" showSearch />
        </a-form-item>
        <template v-if="activeData.option.appStyleType == 2">
          <a-form-item label="每行选项数">
            <a-input-number v-model:value="activeData.option.appRowNumber" placeholder="请输入" :min="1" :max="10" />
          </a-form-item>
          <a-form-item label="显示边框">
            <a-switch v-model:checked="activeData.option.appShowBorder" />
          </a-form-item>
        </template>
      </template>
      <template v-else>
        <a-form-item label="每行选项数">
          <a-input-number v-model:value="activeData.option.rowNumber" placeholder="请输入" :min="1" :max="10" />
        </a-form-item>
        <a-form-item label="显示边框">
          <a-switch v-model:checked="activeData.option.showBorder" />
        </a-form-item>
      </template>
      <a-form-item label="选项">
        <a-button @click="openCommonFun">设置</a-button>
      </a-form-item>
      <commonFun-modal @register="registerCommonFun" @change="handleRefreshData" />
      <a-form-item label="图标位置" v-if="showType == 'pc'">
        <tsa-radio v-model:value="activeData.option.styleType" :options="commonFuncStyleList" optionType="button" buttonStyle="solid" />
      </a-form-item>
      <a-form-item label="名称大小">
        <a-input-number v-model:value="activeData.option.labelFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="名称加粗">
        <a-switch v-model:checked="activeData.option.labelFontWeight" />
      </a-form-item>
      <a-form-item label="名称颜色">
        <tsa-color-picker v-model:value="activeData.option.labelFontColor" size="small" />
      </a-form-item>
    </template>
    <template v-if="activeData.tsaDK == 'dataBoard'">
      <template v-if="showType == 'app'">
        <a-form-item label="风格类型">
          <tsa-select v-model:value="activeData.option.appStyleType" :options="appTodoStyleList" placeholder="请选择" showSearch />
        </a-form-item>
        <template v-if="activeData.option.appStyleType == 2">
          <a-form-item label="每行选项数">
            <a-input-number v-model:value="activeData.option.appRowNumber" placeholder="请输入" :min="1" :max="10" />
          </a-form-item>
          <a-form-item label="显示边框">
            <a-switch v-model:checked="activeData.option.appShowBorder" />
          </a-form-item>
        </template>
      </template>
      <template v-else>
        <a-form-item label="每行选项数">
          <a-input-number v-model:value="activeData.option.rowNumber" placeholder="请输入" :min="1" :max="10" />
        </a-form-item>
        <a-form-item label="显示边框">
          <a-switch v-model:checked="activeData.option.showBorder" />
        </a-form-item>
      </template>
      <a-divider>选项设置</a-divider>
      <a-form-item label="数据类型">
        <tsa-radio v-model:value="activeData.dataType" :options="dataTypeList" optionType="button" button-style="solid" @change="dataBoardDataTypeChange" />
      </a-form-item>
      <template v-if="activeData.dataType === 'dynamic'">
        <a-form-item label="数据接口">
          <interface-modal :value="activeData.propsApi" :title="activeData.propsName" popupTitle="数据接口" @change="onPropsApiChange" />
        </a-form-item>
        <a-form-item label="参数设置" v-if="activeData.templateJson?.length">
          <select-interface-btn :templateJson="activeData.templateJson" :showSystemFormId="false" :type="2" />
        </a-form-item>
        <Refresh :refresh="activeData.refresh" v-if="activeData.propsApi" />
      </template>
      <a-form-item label="选项">
        <a-button @click="openDataBoard">设置</a-button>
      </a-form-item>
      <data-board-modal @register="registerDataBoard" @change="handleRefreshData" />
      <a-divider>选项样式</a-divider>
      <a-form-item label="名称大小">
        <a-input-number v-model:value="activeData.option.labelFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="名称加粗">
        <a-switch v-model:checked="activeData.option.labelFontWeight" />
      </a-form-item>
      <a-form-item label="名称颜色">
        <tsa-color-picker v-model:value="activeData.option.labelFontColor" size="small" />
      </a-form-item>
      <a-form-item label="数值大小">
        <a-input-number v-model:value="activeData.option.valueFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="数值加粗">
        <a-switch v-model:checked="activeData.option.valueFontWeight" />
      </a-form-item>
      <a-form-item label="数值颜色">
        <tsa-color-picker v-model:value="activeData.option.valueFontColor" size="small" />
      </a-form-item>
      <a-form-item label="单位大小">
        <a-input-number v-model:value="activeData.option.unitFontSize" placeholder="请输入" :min="12" :max="25" />
      </a-form-item>
      <a-form-item label="单位加粗">
        <a-switch v-model:checked="activeData.option.unitFontWeight" />
      </a-form-item>
      <a-form-item label="单位颜色">
        <tsa-color-picker v-model:value="activeData.option.unitFontColor" size="small" />
      </a-form-item>
    </template>
    <EditorModal @register="registerEditor" @change="handleRefresh" />
  </a-collapse-panel>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, toRefs } from 'vue';
  import draggable from 'vuedraggable';
  import { getAtlas } from '/@/api/lowcodedev/portal';
  import { InterfaceModal } from '/@/components/CommonModal';
  import { useModal } from '/@/components/Modal';
  import Refresh from './RRefresh.vue';
  import Link from './RLink.vue';
  import EditorModal from './REditorModal.vue';
  import MapSet from './RMapSet.vue';
  import TextSet from './RTextSet.vue';
  import CarouselModal from './RCarouselModal.vue';
  import TodoModal from './RTodoModal.vue';
  import CommonFunModal from './RCommonFunModal.vue';
  import DataBoardModal from './RDataBoardModal.vue';
  import { SelectInterfaceBtn } from '/@/components/Interface';
  import {
    barStyleList,
    lineStyleList,
    pieStyleList,
    radarStyleList,
    timeStyleList,
    mapStyleList,
    imageStyleList,
    videoStyleList,
    noStyleTypeList,
    rankStyleList,
    layoutStyleList,
    textStyleList,
    dataTypeList,
    fillStyleList,
    directionList,
    indicatorPositionList,
    playNumberList,
    arrowList,
    appTodoStyleList,
    sortList,
    alignList,
    underLineList,
    commonFuncStyleList,
  } from '../helper/dataMap';

  interface State {
    mapOptions: any[];
    fileList: any[];
  }

  const state = reactive<State>({
    mapOptions: [],
    fileList: [],
  });
  const { mapOptions, fileList } = toRefs(state);
  const [registerEditor, { openModal: openEditorModal }] = useModal();
  const [registerCarousel, { openModal: openCarouselModal }] = useModal();
  const [registerTodo, { openModal: openTodoModal }] = useModal();
  const [registerCommonFun, { openModal: openCommonFunModal }] = useModal();
  const [registerDataBoard, { openModal: openDataBoardModal }] = useModal();
  const props = defineProps(['activeData', 'menuList', 'appMenuList', 'showType']);
  const getStyleTypeOptions = computed(() => {
    const tsaDK = props.activeData.tsaDK;
    if (tsaDK == 'barChart') return JSON.parse(JSON.stringify(barStyleList));
    if (tsaDK == 'lineChart') return lineStyleList;
    if (tsaDK == 'pieChart') return pieStyleList;
    if (tsaDK == 'radarChart') return radarStyleList;
    if (tsaDK == 'rankList') return rankStyleList;
    if (tsaDK == 'timeAxis') return timeStyleList;
    if (tsaDK == 'image') return imageStyleList;
    if (tsaDK == 'video') return videoStyleList;
    if (tsaDK == 'mapChart') return mapStyleList;
  });
  const textAutoplayModeList = [
    { fullName: '横向', id: 'left' },
    { fullName: '纵向', id: 'up' },
  ];

  function getTitle() {
    const tsaDK = props.activeData.tsaDK;
    if (tsaDK == 'barChart') return '柱状图设置';
    if (tsaDK == 'lineChart') return '折线图设置';
    if (tsaDK == 'pieChart') return '饼图设置';
    if (tsaDK == 'radarChart') return '雷达图设置';
    if (tsaDK == 'rankList') return '排行榜设置';
    if (tsaDK == 'timeAxis') return '时间轴设置';
    if (tsaDK == 'text') return '文本设置';
    if (tsaDK == 'image') return '图片设置';
    if (tsaDK == 'carousel') return '轮播图设置';
    if (tsaDK == 'video') return '视频设置';
    if (tsaDK == 'iframe') return 'Iframe设置';
    if (tsaDK == 'mapChart') return '地图设置';
    if (tsaDK == 'todo') return '待办设置';
    if (tsaDK == 'commonFunc') return '常用功能设置';
    if (tsaDK == 'dataBoard') return '数据面板设置';
  }
  function getTipLabel() {
    const tsaDK = props.activeData.tsaDK;
    if (tsaDK == 'barChart') return 'APP不支持背景类型，默认显示基础类型';
    if (tsaDK == 'lineChart') return 'APP不支持堆叠类型，默认显示基础类型';
    if (tsaDK == 'mapChart') return 'APP不支持柱形和柱形排名类型，默认显示散点类型';
    return '';
  }
  function onStyleTypeChange(val) {
    const tsaDK = props.activeData.tsaDK;
    if (tsaDK == 'image' || tsaDK == 'video') {
      props.activeData.propsApi = '';
      props.activeData.propsName = '';
      props.activeData.dataType = 'static';
      props.activeData.option.defaultValue = '';
      if (val == '3') props.activeData.dataType = 'dynamic';
    }
  }
  function addSelectItem() {
    props.activeData.option.columnOptions.push({ value: '', label: '' });
  }
  function handleDel(index) {
    if (props.activeData.option.columnOptions.length > 1) props.activeData.option.columnOptions.splice(index, 1);
  }
  function initMapData() {
    getAtlas().then(res => {
      state.mapOptions = res.data;
    });
  }
  function initData() {
    state.fileList = [];
    if (props.activeData.tsaDK == 'video' && props.activeData.option.defaultValue && props.activeData.option.styleType == 1) {
      state.fileList = [props.activeData.option.defaultValue];
    }
  }
  function renderKeyChange() {
    props.activeData.renderKey = +new Date();
  }
  function textChange() {
    props.activeData.option.defaultValue = '';
    if (props.activeData.dataType == 'static') props.activeData.option.defaultValue = 'BST快速开发平台';
  }
  function dataTypeChange() {
    props.activeData.option.defaultValue = '';
    if (props.activeData.dataType == 'static') props.activeData.option.defaultValue = 'BST快速开发平台';
    props.activeData.propsApi = '';
    props.activeData.propsName = '';
  }
  function dataBoardDataTypeChange() {
    props.activeData.propsApi = '';
    props.activeData.propsName = '';
    renderKeyChange();
  }
  function onPropsApiChange(val, item) {
    if (val) {
      props.activeData.propsApi = val;
      props.activeData.propsName = item.fullName;
      props.activeData.refresh.autoRefresh = false;
      props.activeData.templateJson = item.parameterJson ? JSON.parse(item.parameterJson).map(o => ({ ...o, relationField: '', sourceType: 2 })) : [];
    } else {
      props.activeData.propsApi = '';
      props.activeData.propsName = '';
      props.activeData.templateJson = [];
    }
    renderKeyChange();
  }
  function showEditor() {
    openEditorModal(true, { value: JSON.stringify(props.activeData.option.defaultValue) });
  }
  function handleRefreshData(data) {
    const type = props.showType == 'pc' ? 'defaultValue' : 'appDefaultValue';
    props.activeData.option[type] = data;
    renderKeyChange();
  }
  function handleRefresh(data) {
    props.activeData.option.defaultValue = data;
    renderKeyChange();
  }
  function openCarousel() {
    openCarouselModal(true, getData());
  }
  function openTodo() {
    openTodoModal(true, getData(1));
  }
  function openCommonFun() {
    openCommonFunModal(true, getData());
  }
  function openDataBoard() {
    openDataBoardModal(true, getData());
  }
  function getData(flag?) {
    return {
      menuList: props.menuList,
      appMenuList: props.appMenuList,
      showType: props.showType,
      data: props.showType == 'pc' || flag ? props.activeData.option.defaultValue : props.activeData.option.appDefaultValue,
      dataType: props.activeData.dataType,
      interfaceId: props.activeData.propsApi,
    };
  }
  function onUploadFileChange(e) {
    props.activeData.option.defaultValue = e.length ? e[0] : '';
  }

  onMounted(() => {
    initMapData();
    initData();
  });
</script>

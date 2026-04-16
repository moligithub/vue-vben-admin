import type { Component } from 'vue';
import type { ComponentType } from './types/index';

/**
 * Component list, register here to setting it in the form
 */
import { StrengthMeter } from '/@/components/StrengthMeter';
import { CountdownInput } from '/@/components/CountDown';
// tsa 组件
import {
  TsaAlert,
  TsaAreaSelect,
  TsaAutoComplete,
  TsaButton,
  TsaCron,
  TsaCascader,
  TsaColorPicker,
  TsaCheckbox,
  TsaCheckboxSingle,
  TsaDatePicker,
  TsaDateRange,
  TsaTimePicker,
  TsaTimeRange,
  TsaMonthPicker,
  TsaWeekPicker,
  TsaDivider,
  TsaEditorvider,
  TsaGroupTitle,
  TsaIconPicker,
  TsaInput,
  TsaInputPassword,
  TsaInputGroup,
  TsaInputSearch,
  TsaTextareautSearch,
  TsaInputNumber,
  TsaLinkumber,
  TsaOpenData,
  TsaOrganizeSelect,
  TsaDepSelect,
  TsaPosSelect,
  TsaGroupSelect,
  TsaRoleSelect,
  TsaUserSelect,
  TsaUsersSelect,
  TsaQrcode,
  TsaBarcode,
  TsaRadio,
  TsaRate,
  TsaSelect,
  TsaSlider,
  TsaSign,
  TsaSignature,
  TsaSwitch,
  TsaText,
  TsaTreeSelect,
  TsaUploadFile,
  TsaUploadImg,
  TsaUploadImgSingle,
  TsaRelationForm,
  TsaRelationFormAttr,
  TsaPopupSelect,
  TsaPopupTableSelect,
  TsaPopupAttr,
  TsaNumberRange,
  TsaCalculate,
  TsaInputTable,
  TsaLocation,
  TsaIframe,
} from '/@/components/Tsa';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('StrengthMeter', StrengthMeter);
componentMap.set('InputCountDown', CountdownInput);

componentMap.set('InputGroup', TsaInputGroup);
componentMap.set('InputSearch', TsaInputSearch);
componentMap.set('MonthPicker', TsaMonthPicker);
componentMap.set('WeekPicker', TsaWeekPicker);

componentMap.set('Alert', TsaAlert);
componentMap.set('AreaSelect', TsaAreaSelect);
componentMap.set('AutoComplete', TsaAutoComplete);
componentMap.set('Button', TsaButton);
componentMap.set('Cron', TsaCron);
componentMap.set('Cascader', TsaCascader);
componentMap.set('ColorPicker', TsaColorPicker);
componentMap.set('Checkbox', TsaCheckbox);
componentMap.set('TsaCheckboxSingle', TsaCheckboxSingle);
componentMap.set('DatePicker', TsaDatePicker);
componentMap.set('DateRange', TsaDateRange);
componentMap.set('TimePicker', TsaTimePicker);
componentMap.set('TimeRange', TsaTimeRange);
componentMap.set('Divider', TsaDivider);
componentMap.set('Editor', TsaEditorvider);
componentMap.set('GroupTitle', TsaGroupTitle);
componentMap.set('Input', TsaInput);
componentMap.set('InputPassword', TsaInputPassword);
componentMap.set('Textarea', TsaTextareautSearch);
componentMap.set('InputNumber', TsaInputNumber);
componentMap.set('IconPicker', TsaIconPicker);
componentMap.set('Link', TsaLinkumber);
componentMap.set('OrganizeSelect', TsaOrganizeSelect);
componentMap.set('DepSelect', TsaDepSelect);
componentMap.set('PosSelect', TsaPosSelect);
componentMap.set('GroupSelect', TsaGroupSelect);
componentMap.set('RoleSelect', TsaRoleSelect);
componentMap.set('UserSelect', TsaUserSelect);
componentMap.set('UsersSelect', TsaUsersSelect);
componentMap.set('Qrcode', TsaQrcode);
componentMap.set('Barcode', TsaBarcode);
componentMap.set('Radio', TsaRadio);
componentMap.set('Rate', TsaRate);
componentMap.set('Select', TsaSelect);
componentMap.set('Slider', TsaSlider);
componentMap.set('Sign', TsaSign);
componentMap.set('Signature', TsaSignature);
componentMap.set('Switch', TsaSwitch);
componentMap.set('Text', TsaText);
componentMap.set('TreeSelect', TsaTreeSelect);
componentMap.set('UploadFile', TsaUploadFile);
componentMap.set('UploadImg', TsaUploadImg);
componentMap.set('UploadImgSingle', TsaUploadImgSingle);
componentMap.set('BillRule', TsaInput);
componentMap.set('ModifyUser', TsaInput);
componentMap.set('ModifyTime', TsaInput);
componentMap.set('CreateUser', TsaOpenData);
componentMap.set('CreateTime', TsaOpenData);
componentMap.set('CurrOrganize', TsaOpenData);
componentMap.set('CurrPosition', TsaOpenData);
componentMap.set('RelationForm', TsaRelationForm);
componentMap.set('RelationFormAttr', TsaRelationFormAttr);
componentMap.set('PopupSelect', TsaPopupSelect);
componentMap.set('PopupTableSelect', TsaPopupTableSelect);
componentMap.set('PopupAttr', TsaPopupAttr);
componentMap.set('NumberRange', TsaNumberRange);
componentMap.set('Calculate', TsaCalculate);
componentMap.set('InputTable', TsaInputTable);
componentMap.set('Location', TsaLocation);
componentMap.set('Iframe', TsaIframe);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };

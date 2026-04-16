import { Input, DatePicker } from 'ant-design-vue';

// tsa 组件
import { BasicCaption } from '/@/components/Basic';
import { TsaAlert } from '/@/components/Tsa/Alert';
import { TsaAreaSelect } from '/@/components/Tsa/AreaSelect';
import { TsaAutoComplete } from '/@/components/Tsa/AutoComplete';
import { TsaButton } from '/@/components/Tsa/Button';
import { TsaCron } from '/@/components/Tsa/Cron';
import { TsaCascader } from '/@/components/Tsa/Cascader';
import { TsaCheckbox, TsaCheckboxSingle } from '/@/components/Tsa/Checkbox';
import { TsaColorPicker } from '/@/components/Tsa/ColorPicker';
import { TsaDatePicker, TsaDateRange, TsaTimePicker, TsaTimeRange } from '/@/components/Tsa/DatePicker';
import { TsaDivider } from '/@/components/Tsa/Divider';
import { TsaIconPicker } from '/@/components/Tsa/IconPicker';
import { TsaInput, TsaTextareautSearch } from '/@/components/Tsa/Input';
import { TsaInputNumber } from '/@/components/Tsa/InputNumber';
import { TsaLinkumber } from '/@/components/Tsa/Link';
import { TsaOpenData } from '/@/components/Tsa/OpenData';
import {
  TsaOrganizeSelect,
  TsaDepSelect,
  TsaPosSelect,
  TsaGroupSelect,
  TsaRoleSelect,
  TsaUserSelect,
  TsaUsersSelect,
} from '/@/components/Tsa/Organize';
import { TsaQrcode } from '/@/components/Tsa/Qrcode';
import { TsaBarcode } from '/@/components/Tsa/Barcode';
import { TsaRadio } from '/@/components/Tsa/Radio';
import { TsaSelect } from '/@/components/Tsa/Select';
import { TsaRate } from '/@/components/Tsa/Rate';
import { TsaSlider } from '/@/components/Tsa/Slider';
import { TsaSign } from '/@/components/Tsa/Sign';
import { TsaSignature } from '/@/components/Tsa/Signature';
import { TsaSwitch } from '/@/components/Tsa/Switch';
import { TsaText } from '/@/components/Tsa/Text';
import { TsaTreeSelect } from '/@/components/Tsa/TreeSelect';
import { TsaUploadFile, TsaUploadImg, TsaUploadImgSingle } from '/@/components/Tsa/Upload';
import { Tinymce } from '/@/components/Tinymce/index';
import { TsaRelationForm } from '/@/components/Tsa/RelationForm';
import { TsaRelationFormAttr } from '/@/components/Tsa/RelationFormAttr';
import { TsaPopupSelect, TsaPopupTableSelect } from '/@/components/Tsa/PopupSelect';
import { TsaPopupAttr } from '/@/components/Tsa/PopupAttr';
import { TsaNumberRange } from '/@/components/Tsa/NumberRange';
import { TsaCalculate } from '/@/components/Tsa/Calculate';
import { TsaInputTable } from '/@/components/Tsa/InputTable';
import { TsaLocation } from '/@/components/Tsa/Location';
import { TsaIframe } from '/@/components/Tsa/Iframe';

const TsaInputPassword = Input.Password;
TsaInputPassword.name = 'TsaInputPassword';
const TsaInputGroup = Input.Group;
TsaInputGroup.name = 'TsaInputGroup';
const TsaInputSearch = Input.Search;
TsaInputSearch.name = 'TsaInputSearch';
const TsaEditorvider = Tinymce;
TsaEditorvider.name = 'TsaEditorvider';
const TsaGroupTitle = BasicCaption;
TsaGroupTitle.name = 'TsaGroupTitle';
const TsaMonthPicker = DatePicker.MonthPicker;
TsaMonthPicker.name = 'TsaMonthPicker';
const TsaWeekPicker = DatePicker.WeekPicker;
TsaWeekPicker.name = 'TsaWeekPicker';

export {
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
};

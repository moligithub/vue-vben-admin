import type { App } from 'vue';
import { Button } from './Button';
import {
  Input,
  InputNumber,
  Layout,
  Form,
  Switch,
  Dropdown,
  Menu,
  Select,
  Table,
  Checkbox,
  Tabs,
  Collapse,
  Card,
  Tooltip,
  Row,
  Col,
  Popconfirm,
  Divider,
  Alert,
  AutoComplete,
  Cascader,
  Rate,
  Slider,
  Avatar,
  Tag,
  Space,
  Steps,
  Popover,
  Radio,
  Progress,
  Image,
  Upload,
} from 'ant-design-vue';

import { BasicHelp, BasicCaption } from '/@/components/Basic';
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
import { TsaEmpty } from '/@/components/Tsa/Empty';
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
import { TsaUploadFile, TsaUploadImg, TsaUploadImgSingle, TsaUploadBtn } from '/@/components/Tsa/Upload';
import { Tinymce } from '/@/components/Tinymce/index';
import { TsaNumberRange } from '/@/components/Tsa/NumberRange';
import { TsaRelationFormAttr } from '/@/components/Tsa/RelationFormAttr';
import { TsaPopupSelect, TsaPopupTableSelect } from '/@/components/Tsa/PopupSelect';
import { TsaPopupAttr } from '/@/components/Tsa/PopupAttr';
import { TsaCalculate } from '/@/components/Tsa/Calculate';
import { TsaLocation } from '/@/components/Tsa/Location';
import { TsaIframe } from '/@/components/Tsa/Iframe';

const TsaEditorvider = Tinymce;
TsaEditorvider.name = 'TsaEditorvider';
const TsaGroupTitle = BasicCaption;
TsaGroupTitle.name = 'TsaGroupTitle';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(InputNumber)
    .use(Button)
    .use(Layout)
    .use(Form)
    .use(Switch)
    .use(Dropdown)
    .use(Menu)
    .use(Select)
    .use(Table)
    .use(Checkbox)
    .use(Tabs)
    .use(Card)
    .use(Collapse)
    .use(Tooltip)
    .use(Row)
    .use(Col)
    .use(Popconfirm)
    .use(Popover)
    .use(Divider)
    .use(Slider)
    .use(Rate)
    .use(Alert)
    .use(AutoComplete)
    .use(Cascader)
    .use(Avatar)
    .use(Tag)
    .use(Space)
    .use(Steps)
    .use(Radio)
    .use(Progress)
    .use(Image)
    .use(Upload)
    .use(BasicHelp)
    .use(TsaAlert)
    .use(TsaRate)
    .use(TsaSlider)
    .use(TsaAreaSelect)
    .use(TsaAutoComplete)
    .use(TsaButton)
    .use(TsaCron)
    .use(TsaCascader)
    .use(TsaCheckbox)
    .use(TsaCheckboxSingle)
    .use(TsaColorPicker)
    .use(TsaDatePicker)
    .use(TsaDateRange)
    .use(TsaTimePicker)
    .use(TsaTimeRange)
    .use(TsaDivider)
    .use(TsaEmpty)
    .use(TsaGroupTitle)
    .use(TsaIconPicker)
    .use(TsaInput)
    .use(TsaTextareautSearch)
    .use(TsaInputNumber)
    .use(TsaLinkumber)
    .use(TsaOrganizeSelect)
    .use(TsaDepSelect)
    .use(TsaPosSelect)
    .use(TsaGroupSelect)
    .use(TsaRoleSelect)
    .use(TsaUserSelect)
    .use(TsaUsersSelect)
    .use(TsaOpenData)
    .use(TsaQrcode)
    .use(TsaBarcode)
    .use(TsaRadio)
    .use(TsaSelect)
    .use(TsaSign)
    .use(TsaSignature)
    .use(TsaSwitch)
    .use(TsaText)
    .use(TsaTreeSelect)
    .use(TsaEditorvider)
    .use(TsaRelationFormAttr)
    .use(TsaPopupSelect)
    .use(TsaPopupTableSelect)
    .use(TsaPopupAttr)
    .use(TsaNumberRange)
    .use(TsaCalculate)
    .use(TsaUploadFile)
    .use(TsaUploadImg)
    .use(TsaUploadImgSingle)
    .use(TsaUploadBtn)
    .use(TsaLocation)
    .use(TsaIframe);
}

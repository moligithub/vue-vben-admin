import { withInstall } from '/@/utils';
import DatePicker from './src/DatePicker.vue';
import DateRange from './src/DateRange.vue';
import TimePicker from './src/TimePicker.vue';
import TimeRange from './src/TimeRange.vue';

export const TsaDatePicker = withInstall(DatePicker);
export const TsaDateRange = withInstall(DateRange);
export const TsaTimePicker = withInstall(TimePicker);
export const TsaTimeRange = withInstall(TimeRange);

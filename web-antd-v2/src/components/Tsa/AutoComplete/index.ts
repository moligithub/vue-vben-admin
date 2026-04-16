import { withInstall } from '/@/utils';
import type { ExtractPropTypes } from 'vue';
import AutoComplete from './src/AutoComplete.vue';
import { autoCompleteProps } from './src/props';

export const TsaAutoComplete = withInstall(AutoComplete);
export declare type AutoCompleteProps = Partial<ExtractPropTypes<typeof autoCompleteProps>>;

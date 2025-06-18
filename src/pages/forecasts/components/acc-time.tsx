import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { AccumulationTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function PptAccumulationTime() {
    const dispatch = useAppDispatch();
    const acc_time = useAppSelector((state) => state.params?.acc_time);
    const model = useAppSelector((state) => state.params.model);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ acc_time: value }));
    };

    const options: SelectOption[] = [
        { label: AccumulationTime['06H'], value: AccumulationTime['06H'] },
        { label: AccumulationTime['24H'], value: AccumulationTime['24H'] }
    ];
    const default_acctime = model?.includes('mvua-kubwa') ? options[1].value : options[0].value;
    return <SelectInput {...{ inputId: 'select-acc-time', label: 'Accumulation Time', helpText: 'select accumulation time of the forecast', options: options, value: acc_time || default_acctime, onChange: onValueChange }} />;
}

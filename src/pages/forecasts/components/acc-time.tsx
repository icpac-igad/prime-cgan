import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { AccumulationTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function PptAccumulationTime() {
    const dispatch = useAppDispatch();
    const acc_time = useAppSelector((state) => state.params?.acc_time);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ acc_time: value === '6H' || value === '24H' ? AccumulationTime[value] : undefined }));
    };

    const options: SelectOption[] = [
        { label: AccumulationTime['6H'], value: '6H' },
        { label: AccumulationTime['24H'], value: '24H' }
    ];
    return <SelectInput {...{ inputId: 'select-acc-time', label: 'Accumulation Time', helpText: 'select accumulation time of the forecast', options: options, value: acc_time || options[1].value, onChange: onValueChange }} />;
}

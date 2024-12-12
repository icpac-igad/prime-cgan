import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { ValidStartTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function SelectAccTime() {
    const dispatch = useAppDispatch();
    const start_time = useAppSelector((state) => state.params?.start_time);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ start_time: value }));
    };

    const options: SelectOption[] = [
        { label: '00:00 UTC', value: ValidStartTime['0'] },
        { label: '06:00 UTC', value: ValidStartTime['6'] },
        { label: '12:00 UTC', value: ValidStartTime['12'] },
        { label: '18:00 UTC', value: ValidStartTime['18'] }
    ];
    return <SelectInput {...{ inputId: 'select-forecast-time', label: 'Forecast Initialization Time', helpText: 'select forecast initialization time', options: options, value: start_time || options[0].value, onChange: onValueChange }} />;
}

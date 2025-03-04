import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { InitializationTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { GanModels } from '@/pages/tools/constants';
import { initTimeSelect } from '@/pages/tools/plotsLib';

export default function SelectAccTime() {
    const dispatch = useAppDispatch();
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params.ensemble?.model) || GanModels[0].value;

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ start_time: value }));
        if (GanModels.map((m) => m.value).includes(model)) {
            initTimeSelect(forecast_date, value, valid_time);
        }
    };

    const options: SelectOption[] = [
        { label: '00:00 UTC', value: InitializationTime['00H'] },
        { label: '06:00 UTC', value: InitializationTime['06H'] },
        { label: '12:00 UTC', value: InitializationTime['12H'] },
        { label: '18:00 UTC', value: InitializationTime['18H'] }
    ];
    return <SelectInput {...{ inputId: 'select-forecast-time', label: 'Forecast Initialization Time', helpText: 'select forecast initialization time', options: options, value: start_time || options[0].value, onChange: onValueChange }} />;
}

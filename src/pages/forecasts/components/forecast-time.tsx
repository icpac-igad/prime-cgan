import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { InitializationTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { initTimeSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function SelectAccTime() {
    const dispatch = useAppDispatch();
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ start_time: value }));
        if (model?.includes('count')) {
            initTimeSelect(forecast_date, value, valid_time);
        }
    };

    useEffect(() => {
        if(start_time === null || start_time === undefined || start_time === "") {
            dispatch(onForecastParamChange({ start_time: "00h" }));
        }
    }, [start_time])

    const options: SelectOption[] = [
        { label: '00:00 UTC', value: InitializationTime['00H'] },
        { label: '06:00 UTC', value: InitializationTime['06H'] },
        { label: '12:00 UTC', value: InitializationTime['12H'] },
        { label: '18:00 UTC', value: InitializationTime['18H'] }
    ];
    return <SelectInput {...{ inputId: 'select-forecast-time', label: 'Forecast Initialization Time', helpText: 'select forecast initialization time', options: options, value: start_time || options[0].value, onChange: onValueChange }} />;
}

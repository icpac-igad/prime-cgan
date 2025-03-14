import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { validTimeSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function SelectValidTime() {
    const dispatch = useAppDispatch();
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const model = useAppSelector((state) => state.params?.model);

    const addHours = (date: Date, hours: number) => {
        const dateCopy = new Date(date.getTime());
        const hoursToAdd = hours * 60 * 60 * 1000;
        dateCopy.setTime(date.getTime() + hoursToAdd);
        return dateCopy;
    }

    const formatDate = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds();
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth()+1).toString().padStart(2, '0')
        return`${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds} UTC`
    }

    const getValidEnsembleTime = () => {
        const dataDate = new Date(forecast_date || 'Nov 27, 2024');
        const startDate = addHours(dataDate, start_time !== null && start_time !== undefined ? parseInt(start_time.replace('h','')) : 0)
        return [
            { value: '30h', label: `${formatDate(addHours(startDate, 30))} (+30h)` },
            { value: '36h', label: `${formatDate(addHours(startDate, 36))} (+36h)` },
            { value: '42h', label: `${formatDate(addHours(startDate, 42))} (+42h)` },
            { value: '48h', label: `${formatDate(addHours(startDate, 48))} (+48h)` }
        ];
    };

    const getValidCountTime = () => {
        const dataDate = new Date(forecast_date || 'Nov 27, 2024');
        const startDate = addHours(dataDate, start_time !== null && start_time !== undefined ? parseInt(start_time.replace('h','')) : 0)
        return [
            { value: '06h', label: `${formatDate(addHours(startDate, 6))} (+06h)` },
            { value: '30h', label: `${formatDate(addHours(startDate, 30))} (+30h)` },
            { value: '54h', label: `${formatDate(addHours(startDate, 54))} (+54h)` },
            { value: '78h', label: `${formatDate(addHours(startDate, 78))} (+78h)` },
            { value: '102h', label: `${formatDate(addHours(startDate, 102))} (+102)` },
            { value: '126h', label: `${formatDate(addHours(startDate, 126))} (+126)` },
            { value: '150h', label: `${formatDate(addHours(startDate, 150))} (+150)` }
        ];
    };

    useEffect(() => {
        if(valid_time === null || valid_time === undefined || valid_time === "") {
            dispatch(onForecastParamChange({ valid_time:  model?.includes('mvua-kubwa') ? "06h" : "30h"}));
        }
    }, [valid_time])

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ valid_time: value }));
        if (model?.includes('count')) {
            validTimeSelect(forecast_date, start_time, value);
        }
    };

    const options: SelectOption[] = model?.includes('mvua-kubwa') ? getValidCountTime() : getValidEnsembleTime();
    return <SelectInput {...{ inputId: 'forecast-valid-time', label: 'Forecast Valid Time', helpText: 'select forecast initialization time', options: options, value: valid_time || options[0].value, onChange: onValueChange }} />;
}

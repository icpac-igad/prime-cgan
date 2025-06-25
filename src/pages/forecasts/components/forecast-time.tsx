import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { InitializationTime } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { initTimeSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';
import { Message } from 'primereact/message';

export default function SelectAccTime(props: { initTimes: (number | null | undefined)[], datesFeching: boolean, datesFetched: boolean }) {
    const { initTimes, datesFeching, datesFetched } = props;
    const dispatch = useAppDispatch();
    const start_time = useAppSelector((state) => state.params?.start_time) || '00h';
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
        if (start_time === null || start_time === undefined || start_time === "") {
            dispatch(onForecastParamChange({ start_time: "00h" }));
        }
    }, [start_time])

    const getInitTimeOpton = (initTime: number | null | undefined) => {
        switch (initTime) {
            case 18:
                return { label: '18:00 UTC', value: InitializationTime['18H'] }
            case 12:
                return { label: '12:00 UTC', value: InitializationTime['12H'] }
            case 6:
                return { label: '06:00 UTC', value: InitializationTime['06H'] }
            default:
                return { label: '00:00 UTC', value: InitializationTime['00H'] }
        }
    }

    if (datesFeching) {
        return <Spinner />;
    } else if (datesFetched) {
        const options: SelectOption[] = [...new Set(initTimes)].map(value => getInitTimeOpton(value));
        return <SelectInput {...{ inputId: 'select-forecast-time', label: 'Forecast Initialization Time', helpText: 'select forecast initialization time', options: options, value: start_time || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }


}

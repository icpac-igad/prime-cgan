import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash-es';
import { ForecastModel } from '@/pages/tools/types';
import { loadForecast } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function ForecastDates(props: { dataDates: string[], datesFeching: boolean, datesFetched: boolean }) {
    const { dataDates, datesFeching, datesFetched } = props;

    const dispatch = useAppDispatch();
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params?.model) as ForecastModel;
    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ forecast_date: value }));
        if (model?.includes('count')) {
            loadForecast(value.replace('-count', ''), start_time, valid_time);
        }
    };


    useEffect(() => {
        if (!isEmpty(dataDates) && isEmpty(forecast_date)) {
            dispatch(onForecastParamChange({ forecast_date: dataDates[0] }));
        }
    }, [dataDates, forecast_date]);

    useEffect(() => {
        if (!isEmpty(dataDates) && !isEmpty(forecast_date) && !isEmpty(model)) {
            dispatch(onForecastParamChange({ forecast_date: dataDates[0] }));
        }
    }, [dataDates, model]);

    if (datesFeching) {
        return <Spinner />;
    } else if (datesFetched) {
        const options = isEmpty(dataDates) ? [] : dataDates.map((item) => ({ label: item, value: item }));
        return <SelectInput {...{ inputId: 'select-forecast-date', label: 'Forecast Initialization Date', helpText: 'select date of forecast initialization', options: options, value: forecast_date || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

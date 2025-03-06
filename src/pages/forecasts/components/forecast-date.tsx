import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { useFetchForecastDatesQuery } from '@/gateway/slices/settings';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash-es';
import { GanForecastModel } from '@/pages/tools/types';
import { loadForecast } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function ForecastDates() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params?.model) as GanForecastModel;
    const selected_model = model !== null && model !== undefined ? model : activePage === 0 ? "jurre-brishti-count" : "jurre-brishti-ens"
    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ forecast_date: value }));
        if (model?.includes('count')) {
            loadForecast(value.replace("-count", ""), start_time !== null && start_time !== undefined ? start_time : "00", valid_time);
        }
    };

    const { data: datesData = [], isFetching: datesFetching, isSuccess: datesSuccess, isLoading: datesLoading } = useFetchForecastDatesQuery({ url: '/settings/data-dates', query: { model: activePage === 2 ? 'open-ifs' : selected_model } });

    useEffect(() => {
        if(!isEmpty(datesData) && isEmpty(forecast_date)) {
            dispatch(onForecastParamChange({ forecast_date: datesData[0].date }));
        }
    }, [datesData, forecast_date])


    if (datesFetching || datesLoading) {
        return <Spinner />;
    } else if (datesSuccess) {
        const options = isEmpty(datesData) ? [] : datesData.map((item) => ({ label: item.date, value: item.date }));
        return <SelectInput {...{ inputId: 'select-forecast-date', label: 'Forecast Initialization Date', helpText: 'select date of forecast initialization', options: options, value: forecast_date || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

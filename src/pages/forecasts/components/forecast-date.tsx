import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { useFetchForecastDatesQuery } from '@/gateway/slices/settings';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash-es';
import { GanForecastModel } from '@/pages/tools/types';
import { loadForecast } from '@/pages/tools/plotsLib';

export default function ForecastDates() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params?.model) as GanForecastModel;

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ forecast_date: value }));
        if (model?.includes('count')) {
            loadForecast(value, start_time, valid_time);
        }
    };

    const { data: datesData = [], isFetching: datesFetching, isSuccess: datesSuccess, isLoading: datesLoading } = useFetchForecastDatesQuery({ url: '/settings/data-dates', query: { model: activePage === 2 ? 'open-ifs' : model } });
    if (!datesLoading && datesSuccess && !isEmpty(datesData)) {
        dispatch(onForecastParamChange({ forecast_date: datesData[0].date }));
    }

    if (datesFetching || datesLoading) {
        return <Spinner />;
    } else if (datesSuccess) {
        const options = isEmpty(datesData) ? [] : datesData.map((item) => ({ label: item.date, value: item.date }));
        return <SelectInput {...{ inputId: 'select-forecast-date', label: 'Forecast Initialization Date', helpText: 'select date of forecast initialization', options: options, value: forecast_date || options[0]?.value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

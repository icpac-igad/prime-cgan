import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { useFetchForecastDatesQuery } from '@/gateway/slices/settings';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash';

export default function SelectColorStyle() {
    const dispatch = useAppDispatch();
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ forecast_date: value }));
    };

    const { data = [], isFetching, isSuccess, isLoading } = useFetchForecastDatesQuery({ url: '/settings/data-dates', query: { forecast: 'cgan' } });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        const options = data.map((item) => ({ label: item.date, value: item.date }));
        return <SelectInput {...{ inputId: 'select-forecast-date', label: 'Forecast Initialization Date', helpText: 'select date of forecast initialization', options: options, value: forecast_date || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

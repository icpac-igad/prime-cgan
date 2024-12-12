import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { ForecastDate } from '@/client';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash';

interface componentProps {
    data: ForecastDate[];
    isFetching: boolean;
    isSuccess: boolean;
    isLoading: boolean;
}

export default function ForecastDates(props: componentProps) {
    const dispatch = useAppDispatch();
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ forecast_date: value }));
    };

    if (props.isFetching || props.isLoading) {
        return <Spinner />;
    } else if (props.isSuccess && !isEmpty(props.data)) {
        const options = props.data.map((item) => ({ label: item.date, value: item.date }));
        return <SelectInput {...{ inputId: 'select-forecast-date', label: 'Forecast Initialization Date', helpText: 'select date of forecast initialization', options: options, value: forecast_date || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

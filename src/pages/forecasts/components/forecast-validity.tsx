import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { validTimeSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import { Message } from 'primereact/message';

export default function SelectValidTime(props: { dataDates: string[], validTimes: (number | null | undefined)[], datesFeching: boolean, datesFetched: boolean }) {
    const dispatch = useAppDispatch();
    const { dataDates, validTimes, datesFeching, datesFetched } = props;

    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const model = useAppSelector((state) => state.params?.model);

    const addHours = (date: Date, hours: number) => {
        const dateCopy = new Date(date.getTime());
        const hoursToAdd = hours * 60 * 60 * 1000;
        dateCopy.setTime(date.getTime() + hoursToAdd);
        return dateCopy;
    };

    const formatDate = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds} UTC`;
    };

    const getValidTimeOptions = (validTime: number | null | undefined) => {
        const dataDate = new Date(forecast_date ? forecast_date : !isEmpty(dataDates) ? dataDates[0] : 'Nov 27, 2024');
        const startDate = addHours(dataDate, start_time !== null && start_time !== undefined ? parseInt(start_time.replace('h', '')) : 0);
        switch (validTime) {
            case 6:
                return { value: '06h', label: `${formatDate(addHours(startDate, 6))} (+06h)` }
            case 36:
                return { value: '36h', label: `${formatDate(addHours(startDate, 36))} (+36h)` }
            case 42:
                return { value: '42h', label: `${formatDate(addHours(startDate, 42))} (+42h)` }
            case 48:
                return { value: '48h', label: `${formatDate(addHours(startDate, 48))} (+48h)` }
            case 54:
                return { value: '54h', label: `${formatDate(addHours(startDate, 54))} (+54h)` }
            case 78:
                return { value: '78h', label: `${formatDate(addHours(startDate, 78))} (+78h)` }
            case 102:
                return { value: '102h', label: `${formatDate(addHours(startDate, 102))} (+102)` }
            case 126:
                return { value: '126h', label: `${formatDate(addHours(startDate, 126))} (+126)` }
            case 150:
                return { value: '150h', label: `${formatDate(addHours(startDate, 150))} (+150)` }
            default:
                return { value: '30h', label: `${formatDate(addHours(startDate, 30))} (+30h)` }

        }
    }

    useEffect(() => {
        if (valid_time === null || valid_time === undefined || valid_time === '') {
            if (!isEmpty(validTimes)) {
                dispatch(onForecastParamChange({ valid_time: getValidTimeOptions(validTimes[0]).value }));
            } else {
                dispatch(onForecastParamChange({ valid_time: model?.includes('mvua-kubwa') ? '06h' : '30h' }));
            }
        }
    }, [valid_time]);

    useEffect(() => {
        if (valid_time) {
            if (!validTimes.includes(parseInt(valid_time.replace('h', '')))) {
                dispatch(onForecastParamChange({ valid_time: getValidTimeOptions(validTimes[0]).value }));
            }
        }
    }, [forecast_date])

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ valid_time: value }));
        if (model?.includes('count')) {
            validTimeSelect(forecast_date, start_time, value);
        }
    };

    if (datesFeching) {
        return <Spinner />;
    } else if (datesFetched) {
        const options: SelectOption[] = validTimes.map(value => getValidTimeOptions(value));
        return <SelectInput {...{ inputId: 'forecast-valid-time', label: 'Forecast Valid Time', helpText: 'select forecast initialization time', options: options, value: valid_time || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

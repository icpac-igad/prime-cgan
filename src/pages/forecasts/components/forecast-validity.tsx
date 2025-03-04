import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { GanModels } from '@/pages/tools/constants';
import { validTimeSelect } from '@/pages/tools/plotsLib';

export default function SelectValidTime() {
    const dispatch = useAppDispatch();
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const model = useAppSelector((state) => state.params.ensemble?.model) || GanModels[0].value;

    const getValidTimeOptions = () => {
        const dataDate = new Date(forecast_date || 'Nov 27, 2024');
        const dayOne = new Date(dataDate.getFullYear(), dataDate.getMonth(), dataDate.getDate() + 1);
        const dayTwo = new Date(dataDate.getFullYear(), dataDate.getMonth(), dataDate.getDate() + 2);
        return [
            { value: '30', label: `${dayOne.toDateString()} 12:00 UTC (+30h)` },
            { value: '36', label: `${dayOne.toDateString()} 18:00 UTC (+36h)` },
            { value: '42', label: `${dayTwo.toDateString()} 00:00 UTC (+42h)` },
            { value: '48', label: `${dayTwo.toDateString()} 06:00 UTC (+48h)` }
        ];
    };

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ valid_time: value }));
        if (GanModels.map((m) => m.value).includes(model)) {
            validTimeSelect(forecast_date, start_time, value);
        }
    };

    const options: SelectOption[] = getValidTimeOptions();
    return <SelectInput {...{ inputId: 'forecast-valid-time', label: 'Forecast Valid Time', helpText: 'select forecast initialization time', options: options, value: valid_time || options[0].value, onChange: onValueChange }} />;
}

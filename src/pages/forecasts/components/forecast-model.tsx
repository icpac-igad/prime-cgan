import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { showModelPlot } from '@/pages/tools/plotsLib';

export default function ForecastModel() {
    const dispatch = useAppDispatch();
    const model = useAppSelector((state) => state.params.cgan?.model);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);

    const options: SelectOption[] = [
        { label: 'Jurre Brishti', value: 'Jurre brishti' },
        { label: 'Mvua Kubwa', value: 'Mvua kubwa' }
    ];

    // Called by the modelSelect menu
    const onModelSelect = (value: string) => {
        // Set selected model in the store
        dispatch(onGanParamChange({ model: value }));
        // show plots associated with the model
        showModelPlot(value, forecast_date, start_time, valid_time);
    };

    return <SelectInput {...{ inputId: 'forecast-model', label: 'Forecast Model', helpText: 'select cGAN forecasting model', options: options, value: model || options[0].value, onChange: onModelSelect }} />;
}

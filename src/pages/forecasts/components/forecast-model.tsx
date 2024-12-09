import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function ForecastModel() {
    const dispatch = useAppDispatch();
    const model = useAppSelector((state) => state.params.cgan?.model);

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ model: value }));
    };

    const options: SelectOption[] = [
        { label: 'Jurre Bristi', value: 'Jurre Bristi' },
        { label: 'Mvua Kubwa', value: 'Mvua Kubwa' }
    ];
    return <SelectInput {...{ inputId: 'forecast-model', label: 'Forecast Model', helpText: 'select cGAN forecasting model', options: options, value: model || options[0].value, onChange: onValueChange }} />;
}

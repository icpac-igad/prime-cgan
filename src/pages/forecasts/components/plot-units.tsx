import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function SelectPlotunits() {
    const dispatch = useAppDispatch();
    const plot_units = useAppSelector((state) => state.params?.plot_units);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ plot_units: value }));
    };

    const options: SelectOption[] = [
        { label: PrecipitationUnit.MM_H, value: PrecipitationUnit.MM_H },
        { label: PrecipitationUnit.MM_6H, value: PrecipitationUnit.MM_6H },
        { label: PrecipitationUnit.MM_DAY, value: PrecipitationUnit.MM_DAY },
        { label: PrecipitationUnit.MM_WEEK, value: PrecipitationUnit.MM_WEEK }
    ];
    return <SelectInput {...{ inputId: 'select-plot-units', label: 'Accumulation Units', helpText: 'select precipitation accumulation for visualization maps', options: options, value: plot_units || options[1].value, onChange: onValueChange }} />;
}

import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function SelectPlotunits() {
    const dispatch = useAppDispatch();
    const plot_units = useAppSelector((state) => state.params?.plot_units);

    const onValueChange = (value: string) => {
        if (value === 'MM_H' || value === 'MM_6H' || value === 'MM_DAY' || value === 'MM_WEEK') {
            dispatch(onForecastParamChange({ plot_units: PrecipitationUnit[value] }));
        }
    };

    const options: SelectOption[] = [
        { label: PrecipitationUnit.MM_H, value: 'MM_H' },
        { label: PrecipitationUnit.MM_6H, value: 'MM_6H' },
        { label: PrecipitationUnit.MM_DAY, value: 'MM_DAY' },
        { label: PrecipitationUnit.MM_WEEK, value: 'MM_WEEK' }
    ];
    return <SelectInput {...{ inputId: 'select-plot-units', label: 'Plot Units', helpText: 'select units to be used for plotting maps', options: options, value: plot_units || options[1].value, onChange: onValueChange }} />;
}

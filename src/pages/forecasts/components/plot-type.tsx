import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { plotSelect } from '@/pages/tools/plotsLib';

export default function PlotType() {
    const dispatch = useAppDispatch();
    const plot = useAppSelector((state) => state.params.cgan?.histogram_plot);

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ model: value }));

        plotSelect(value);
    };

    const options: SelectOption[] = [
        { label: 'Probability to exceed value', value: 'Probability' },
        { label: 'Values below probability', value: 'Values' }
    ];
    return <SelectInput {...{ inputId: 'plot-type', label: 'Probability Plot Type', helpText: 'select probability descriptor for the histogram plot', options: options, value: plot || options[0].value, onChange: onValueChange }} />;
}

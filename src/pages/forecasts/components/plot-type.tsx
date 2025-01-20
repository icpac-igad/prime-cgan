import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { GanModels } from '@/pages/tools/constants';
import { plotSelect } from '@/pages/tools/plotsLib';

export default function PlotType() {
    const dispatch = useAppDispatch();

    const options: SelectOption[] = [
        { label: 'Probability to exceed value', value: 'Probability' },
        { label: 'Values below probability', value: 'Values' }
    ];

    const plot = useAppSelector((state) => state.params.cgan?.histogram_plot) || options[0].value;
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ histogram_plot: value }));

        if (GanModels.map((m) => m.value).includes(model)) {
            plotSelect(value);
        }
    };

    return <SelectInput {...{ inputId: 'plot-type', label: 'Probability Plot Type', helpText: 'select probability descriptor for the histogram plot', options: options, value: plot, onChange: onValueChange }} />;
}

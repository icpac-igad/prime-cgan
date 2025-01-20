import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onGanParamChange } from '@/gateway/slices/params';

import { GanModels } from '@/pages/tools/constants';
import { percentagesSelect } from '@/pages/tools/plotsLib';

export default function ShowPercentage() {
    const dispatch = useAppDispatch();

    const show_percent = useAppSelector((state) => state.params.cgan?.show_percentages || false);
    const options = ['Percentages', 'Words'];
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ show_percentages: value === options[0] ? true : false }));

        if (GanModels.map((m) => m.value).includes(model)) {
            percentagesSelect(value);
        }
    };

    const plot = useAppSelector((state) => state.params.cgan?.histogram_plot) || 'Values';

    return (
        <ToggleButton
            {...{ label: 'Legend Units', disabled: plot === 'Probability' ? false : true, inputId: 'show-percent', helpText: 'Show percentages or words', options: options, value: show_percent ? options[0] : options[1], onChange: onValueChange }}
        />
    );
}

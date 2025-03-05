import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onEnsembleParamChange } from '@/gateway/slices/params';

import { percentagesSelect } from '@/pages/tools/plotsLib';

export default function ShowPercentage() {
    const dispatch = useAppDispatch();

    const show_percent = useAppSelector((state) => state.params.ensemble?.show_percentages || false);
    const options = ['Percentages', 'Words'];
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: string) => {
        dispatch(onEnsembleParamChange({ show_percentages: value === options[0] ? true : false }));

        if (model?.includes('count')) {
            percentagesSelect(value);
        }
    };

    const plot = useAppSelector((state) => state.params.ensemble?.plot_type) || 'Values';

    return (
        <ToggleButton
            {...{ label: 'Legend Units', disabled: plot === 'Probability' ? false : true, inputId: 'show-percent', helpText: 'Show percentages or words', options: options, value: show_percent ? options[0] : options[1], onChange: onValueChange }}
        />
    );
}

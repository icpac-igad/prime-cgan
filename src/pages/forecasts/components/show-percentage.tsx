import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onCountParamChange } from '@/gateway/slices/params';

import { percentagesSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function ShowPercentage() {
    const dispatch = useAppDispatch();

    const show_percent = useAppSelector((state) => state.params.count?.show_percentages);
    const options = ['Percentages', 'Words'];
    const model = useAppSelector((state) => state.params?.model);

    useEffect(() => {
        if(show_percent === undefined || show_percent === null) {
            dispatch(onCountParamChange({ show_percentages: false }));
        }
    }, [show_percent])

    const onValueChange = (value: string) => {
        dispatch(onCountParamChange({ show_percentages: value === options[0] ? true : false }));

        if (model?.includes('count')) {
            percentagesSelect(value);
        }
    };

    const plot = useAppSelector((state) => state.params.count?.plot_type) || 'Probability';

    return (
        <ToggleButton
            {...{ label: 'Legend Units', disabled: plot === 'Probability' ? false : true, inputId: 'show-percent', helpText: 'Show percentages or words', options: options, value: show_percent ? options[0] : options[1], onChange: onValueChange }}
        />
    );
}

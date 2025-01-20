import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onGanParamChange } from '@/gateway/slices/params';

import { percentagesSelect } from '@/pages/tools/plotsLib';

export default function ShowPercentage() {
    const dispatch = useAppDispatch();

    const show_percent = useAppSelector((state) => state.params.cgan?.show_percentages || false);
    const options = ['Percentages', 'Words'];

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ show_percentages: value === options[0] ? true : false }));

        percentagesSelect(value);
    };

    return <ToggleButton {...{ label: 'Legend Units', inputId: 'show-percent', helpText: 'Show percentages or words', options: options, value: show_percent ? options[0] : options[1], onChange: onValueChange }} />;
}

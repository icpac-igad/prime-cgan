import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
// import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

import { GanModels } from '@/pages/tools/constants';
import { thresholdChanceSet } from '@/pages/tools/plotsLib';

export default function ThresholdChance() {
    const dispatch = useAppDispatch();
    const certainity = useAppSelector((state) => state.params.cgan?.histogram_certainity) || 95;
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;
    // const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ histogram_certainity: value }));
        if (GanModels.map((m) => m.value).includes(model)) {
            thresholdChanceSet(certainity);
        }
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Threshold Probability',
                inputId: 'threshold-chance',
                helpText: 'Show the chance of rainfall above this value',
                value: certainity,
                onChange: onValueChange,
                min: 1,
                suffix: ' %'
            }}
        />
    );
}

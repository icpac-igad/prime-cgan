import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onEnsembleParamChange } from '@/gateway/slices/params';
// import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

import { thresholdChanceSet } from '@/pages/tools/plotsLib';

export default function ThresholdChance() {
    const dispatch = useAppDispatch();
    const certainity = useAppSelector((state) => state.params.ensemble?.certainity) || 95;
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: number) => {
        dispatch(onEnsembleParamChange({ certainity: value }));
        if (model?.includes('count')) {
            thresholdChanceSet(value);
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

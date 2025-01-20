import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
// import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

export default function ThresholdChance() {
    const dispatch = useAppDispatch();
    const certainity = useAppSelector((state) => state.params.cgan?.histogram_certainity);
    // const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ threshold: value }));
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Threshold Probability',
                inputId: 'threshold-chance',
                helpText: 'Show the chance of rainfall above this value',
                value: certainity || 95,
                onChange: onValueChange,
                min: 1,
                suffix: '%'
            }}
        />
    );
}

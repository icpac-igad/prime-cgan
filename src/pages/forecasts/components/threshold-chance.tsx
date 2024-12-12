import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

export default function ThresholdChance() {
    const dispatch = useAppDispatch();
    const threshold = useAppSelector((state) => state.params.cgan?.threshold);
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ threshold: value }));
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Exceedence Threshold',
                inputId: 'threshold-chance',
                helpText: 'Chance for precipitation above the given value',
                value: threshold || 5,
                onChange: onValueChange,
                min: 0.1,
                suffix: plot_units === undefined ? undefined : ` ${plot_units}`
            }}
        />
    );
}

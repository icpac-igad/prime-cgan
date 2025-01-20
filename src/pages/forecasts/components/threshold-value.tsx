import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

export default function HistogramThesholdValue() {
    const dispatch = useAppDispatch();
    const threshold = useAppSelector((state) => state.params.cgan?.threshold);
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ histogram_bins: value }));
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Threshold Value',
                inputId: 'threshold-value',
                helpText: 'Plot a line indicating the amount of rain that will be exceeded with a given probability.',
                value: threshold || 5,
                onChange: onValueChange,
                min: 1,
                suffix: plot_units === undefined ? undefined : ` ${plot_units}`
            }}
        />
    );
}

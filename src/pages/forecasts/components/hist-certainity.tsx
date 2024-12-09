import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

export default function HistogramCertainity() {
    const dispatch = useAppDispatch();
    const certainity = useAppSelector((state) => state.params.cgan?.histogram_certainity);
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ histogram_bins: value }));
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Certainity Level',
                inputId: 'certainity-level',
                helpText: 'Plot a line indicating the amount of rain that will be exceeded with a given probability.',
                value: certainity || 5.5,
                onChange: onValueChange,
                min: 0.1,
                suffix: plot_units === undefined ? undefined : ` ${plot_units}`
            }}
        />
    );
}

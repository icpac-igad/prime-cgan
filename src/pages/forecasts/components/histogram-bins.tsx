import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import NumericInput from './form/numeric-input';

export default function HistogramBins() {
    const dispatch = useAppDispatch();
    const hist_bins = useAppSelector((state) => state.params.cgan?.histogram_bins);

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ histogram_bins: value }));
    };

    return (
        <NumericInput
            {...{
                label: 'Number of Histogram Bins',
                inputId: 'histogram-bins',
                helpText: 'Number of evenly spaced bins for the histogram',
                value: hist_bins || 10,
                onChange: onValueChange,
                min: 0,
                max: 15,
                suffix: ' bins'
            }}
        />
    );
}

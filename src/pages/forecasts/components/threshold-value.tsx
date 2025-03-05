import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

import { thresholdValueSet } from '@/pages/tools/plotsLib';

export default function HistogramThesholdValue() {
    const dispatch = useAppDispatch();
    const threshold = useAppSelector((state) => state.params?.threshold) || 5;
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: number) => {
        dispatch(onForecastParamChange({ threshold: value }));

        if (model?.includes('count')) {
            thresholdValueSet(threshold);
        }
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Threshold Value',
                inputId: 'threshold-value',
                helpText: 'Plot a line indicating the amount of rain that will be exceeded with a given probability.',
                value: threshold,
                onChange: onValueChange,
                min: 1,
                suffix: plot_units === undefined ? undefined : ` ${plot_units}`
            }}
        />
    );
}

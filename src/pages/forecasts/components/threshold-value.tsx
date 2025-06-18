import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

import { thresholdValueSet } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function HistogramThesholdValue() {
    const dispatch = useAppDispatch();
    const threshold = useAppSelector((state) => state.params?.threshold);
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);
    const model = useAppSelector((state) => state.params?.model);

    useEffect(() => {
        if (threshold === null || threshold === undefined) {
            dispatch(onForecastParamChange({ threshold: 6 }));
        }
    }, [threshold]);

    const onValueChange = (value: number) => {
        dispatch(onForecastParamChange({ threshold: value }));

        if (model?.includes('count')) {
            thresholdValueSet(value);
        }
    };

    return (
        <NumericInput
            {...{
                label: 'Precipitation Threshold Value',
                inputId: 'threshold-value',
                helpText: 'Plot a line indicating the amount of rain that will be exceeded with a given probability.',
                value: threshold || 6,
                onChange: onValueChange,
                min: 1,
                suffix: plot_units === undefined ? undefined : ` ${plot_units}`
            }}
        />
    );
}

import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import NumericInput from './form/numeric-input';

import { GanModels } from '@/pages/tools/constants';
import { thresholdValueSet } from '@/pages/tools/plotsLib';

export default function HistogramThesholdValue() {
    const dispatch = useAppDispatch();
    const threshold = useAppSelector((state) => state.params.cgan?.threshold) || 5;
    const plot_units = useAppSelector((state) => state.params?.plot_units || PrecipitationUnit.MM_6H);
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;

    const onValueChange = (value: number) => {
        dispatch(onGanParamChange({ threshold: value }));

        if (GanModels.map((m) => m.value).includes(model)) {
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

import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange, onGanParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { GanModels } from '@/pages/tools/constants';
import { unitsSelect } from '@/pages/tools/plotsLib';
import { getPlotNormalisation, roundSF } from '@/pages/tools/plotForecasts';

export default function SelectPlotunits() {
    const dispatch = useAppDispatch();
    const plot_units = useAppSelector((state) => state.params?.plot_units);
    const threshold = useAppSelector((state) => state.params?.cgan.threshold) || 5;
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ plot_units: value }));

        if (GanModels.map((m) => m.value).includes(model)) {
            let norm = getPlotNormalisation(value);
            let maxRain = threshold * norm;
            dispatch(onGanParamChange({ threshold: roundSF(maxRain * norm, 3) }));
            unitsSelect(value, maxRain);
        }
    };

    const options: SelectOption[] = [
        { label: PrecipitationUnit.MM_H, value: PrecipitationUnit.MM_H },
        { label: PrecipitationUnit.MM_6H, value: PrecipitationUnit.MM_6H },
        { label: PrecipitationUnit.MM_DAY, value: PrecipitationUnit.MM_DAY },
        { label: PrecipitationUnit.MM_WEEK, value: PrecipitationUnit.MM_WEEK }
    ];
    return <SelectInput {...{ inputId: 'select-plot-units', label: 'Accumulation Units', helpText: 'select precipitation accumulation for visualization maps', options: options, value: plot_units || options[1].value, onChange: onValueChange }} />;
}

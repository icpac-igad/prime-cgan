import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';


import { unitsSelect } from '@/pages/tools/plotsLib';
import { getPlotNormalisation, roundSF } from '@/pages/tools/plotForecasts';

export default function SelectPlotunits() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const plot_units = useAppSelector((state) => state.params?.plot_units);
    const threshold = useAppSelector((state) => state.params?.threshold) || 5;
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ plot_units: value }));

        if ((activePage === 1 || activePage === 0) && model) {
            let norm = getPlotNormalisation(value);
            let maxRain = threshold * norm;
            dispatch(onForecastParamChange({ threshold: roundSF(maxRain * norm, 3) }));
            unitsSelect(value, maxRain);
        }
    };

    const options: SelectOption[] = [
        { label: PrecipitationUnit.MM_H, value: PrecipitationUnit.MM_H },
        { label: PrecipitationUnit.MM_6H, value: PrecipitationUnit.MM_6H },
        { label: PrecipitationUnit.MM_DAY, value: PrecipitationUnit.MM_DAY },
    ];
    return <SelectInput {...{ inputId: 'select-plot-units', label: 'Accumulation Units', helpText: 'select precipitation accumulation for visualization maps', options: options, value: plot_units || options[1].value, onChange: onValueChange }} />;
}

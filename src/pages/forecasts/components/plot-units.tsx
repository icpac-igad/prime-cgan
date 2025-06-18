import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import { PrecipitationUnit } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

import { unitsSelect } from '@/pages/tools/plotsLib';
import { getPlotNormalisation, roundSF } from '@/pages/tools/plotForecasts';

export default function SelectPlotunits() {
    const options: SelectOption[] = [
        { label: PrecipitationUnit.MM_H, value: PrecipitationUnit.MM_H },
        { label: PrecipitationUnit.MM_6H, value: PrecipitationUnit.MM_6H },
        { label: PrecipitationUnit.MM_DAY, value: PrecipitationUnit.MM_DAY }
    ];

    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const plot_units = useAppSelector((state) => state.params?.plot_units) || options[1].value;
    const threshold = useAppSelector((state) => state.params?.threshold) || 1;
    const model = useAppSelector((state) => state.params?.model);

    const onValueChange = (value: string) => {
        if ((activePage === 1 || activePage === 0) && model) {
            let norm = getPlotNormalisation(value);
            let prevNorm = getPlotNormalisation(plot_units);

            let newThreshold = (threshold / prevNorm) * norm;
            dispatch(onForecastParamChange({ threshold: roundSF(newThreshold, 3) }));
            unitsSelect(value, newThreshold / norm);
        }

        dispatch(onForecastParamChange({ plot_units: value }));
    };

    return <SelectInput {...{ inputId: 'select-plot-units', label: 'Accumulation Units', helpText: 'select precipitation accumulation for visualization maps', options: options, value: plot_units || options[1].value, onChange: onValueChange }} />;
}

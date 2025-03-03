import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onEnsembleParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';

import { GanModels } from '@/pages/tools/constants';
import { showModelPlot } from '@/pages/tools/plotsLib';

export default function ForecastModel() {
    const dispatch = useAppDispatch();
    const model = useAppSelector((state) => state.params.ensemble?.model) || GanModels[0].value;
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);

    // Called by the modelSelect menu
    const onModelSelect = (value: string) => {
        // Set selected model in the store
        dispatch(onEnsembleParamChange({ model: value }));
        // show plots associated with the model
        if (GanModels.map((m) => m.value).includes(model)) {
            showModelPlot(value, forecast_date, start_time, valid_time);
        }
    };

    return <SelectInput {...{ inputId: 'forecast-model', label: 'Forecast Model', helpText: 'select cGAN forecasting model', options: GanModels, value: model, onChange: onModelSelect }} />;
}

import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import { useFetchForecastModelsQuery } from '@/gateway/slices/settings';
import { Message } from 'primereact/message';
import { showModelPlot } from '@/pages/tools/plotsLib';
import Spinner from './spinner';

import {isEmpty} from 'lodash-es'
import { useEffect } from 'react';

export default function ForecastModel() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const valid_time = useAppSelector((state) => state.params?.valid_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const model = useAppSelector((state) => state.params?.model);

    const {
            data = [],
            isFetching,
            isLoading,
            isSuccess
        } = useFetchForecastModelsQuery({
            url: '/settings/gan-forecast-models',
            query: {no_ensemble: activePage === 1 ? 50 : 1000}
        });

    useEffect(() => {
        if(!isEmpty(data)) {
            dispatch(onForecastParamChange({ model: data[0].name }));
        }
    }, [data, model])

    // Called by the modelSelect menu
    const onModelSelect = (value: string) => {
        // Set selected model in the store
        dispatch(onForecastParamChange({ model: value }));
        // show plots associated with the model
        if (model?.includes('-count')) {
            showModelPlot(value.replace("-count", ""), forecast_date, start_time, valid_time);
        }
    };

    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess) {
        const options = isEmpty(data) ? [] : data.map((item) => ({ label: item.label, value: item.name }));
        return <SelectInput {...{ inputId: 'forecast-model', label: 'Forecast Model', helpText: 'select cGAN forecasting model', options: options, value: model !== undefined ? model : "", onChange: onModelSelect }} />
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

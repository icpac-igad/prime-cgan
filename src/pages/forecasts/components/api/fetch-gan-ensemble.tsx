import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchGanEnsembleQuery } from '@/gateway/slices/cgan';
import { selectForecastParams, selectGanEnsembleParams } from '@/gateway/slices/params';

import { isEmpty } from 'lodash';
import Spinner from '../spinner';

export default function FetchGanEnsemble() {
    const forecast_params = { ...useSelector(selectForecastParams, shallowEqual), ...useSelector(selectGanEnsembleParams, shallowEqual) };
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanEnsembleQuery({
        url: '/forecast/cgan-ensemble',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`cGAN Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

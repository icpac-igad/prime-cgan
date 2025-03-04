import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchOpenIfsForecastQuery } from '@/gateway/slices/open-ifs';
import { selectEnsembleParams, selectOpenIfsParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchOpenIfsForecast() {
    const forecast_params = validObjectEntries({ ...useSelector(selectEnsembleParams, shallowEqual), ...useSelector(selectOpenIfsParams, shallowEqual) });
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchOpenIfsForecastQuery({
        url: '/open-ifs-forecats/open-ifs',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`Open IFS Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch Open IFS Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

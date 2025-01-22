import { Message } from 'primereact/message';
import { useSelector, shallowEqual } from 'react-redux';
import { useFetchGanForecastQuery } from '@/gateway/slices/cgan';
import { selectForecastParams, selectGanParams } from '@/gateway/slices/params';
import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchGanForecast() {
    const forecast_params = {
        ...useSelector(selectForecastParams, shallowEqual),
        ...useSelector(selectGanParams, shallowEqual)
    };
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanForecastQuery({
        url: '/forecast/cgan-forecast',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`cGAN Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

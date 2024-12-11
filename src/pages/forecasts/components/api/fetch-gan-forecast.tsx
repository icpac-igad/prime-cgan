import { Message } from 'primereact/message';
import { useSelector } from 'react-redux';
import { useFetchGanForecastQuery } from '@/gateway/slices/cgan';
import { forecastParams, ganParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { isEmpty } from 'lodash';
import Spinner from '../spinner';

export default function FetchGanForecast() {
    const forecast_params = validObjectEntries({ ...useSelector(forecastParams), ...useSelector(ganParams) });
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
                    <img key={plot.image_url} src={plot.image_url} alt={`cGAN Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.forecast_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.forecast_time}`} />;
    }
}

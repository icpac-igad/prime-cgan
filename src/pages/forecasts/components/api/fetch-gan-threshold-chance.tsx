import { useSelector } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchGanThresholdChanceQuery } from '@/gateway/slices/cgan';
import { forecastParams, ganThresholdChanceParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { isEmpty } from 'lodash';
import Spinner from '../spinner';

export default function FetchGanThresholdChance() {
    const forecast_params = validObjectEntries({ ...useSelector(forecastParams), ...useSelector(ganThresholdChanceParams) });
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanThresholdChanceQuery({
        url: '/forecast/cgan-threshold-chance',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`cGAN threshold chance plots for ${forecast_params?.forecast_date} - ${forecast_params?.forecast_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN threshold chance plots for ${forecast_params?.forecast_date} - ${forecast_params?.forecast_time}`} />;
    }
}

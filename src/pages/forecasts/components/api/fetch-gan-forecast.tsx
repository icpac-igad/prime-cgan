import { Message } from 'primereact/message';
import { useSelector, shallowEqual } from 'react-redux';
import { useAppSelector } from '@/gateway/hooks';
import { useFetchGanForecastQuery } from '@/gateway/slices/cgan';
import { selectEnsembleParams, selectEnsembleForecastParams } from '@/gateway/slices/params';
import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchGanForecast() {
    const forecast_params = {
        ...useSelector(selectEnsembleParams, shallowEqual),
        ...useSelector(selectEnsembleForecastParams, shallowEqual)
    };
    const model = useAppSelector((state) => state.params?.model);
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanForecastQuery({
        url: '/cgan-forecats/cgan-forecast',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess) {
        if (isEmpty(data)) {
            return <Message severity="warn" text={`cGAN forecast products are not ready! Please try again later.`} />
        } else {
        return (
            <div className="card p-4 m-4 shadow-3">
                <div className="flex flex-wrap align-items-center justify-content-center">
                    <div className="flex flex-column gap-1">
                        {data.map((plot) => (
                            <img key={plot.image_url} src={plot.image_url} alt={`${model} Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN Forecast for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

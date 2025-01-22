import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchGanHistogramQuery } from '@/gateway/slices/cgan';
import { selectForecastParams, selectGanHistogramParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchGanHistogram() {
    const forecast_params = validObjectEntries({ ...useSelector(selectForecastParams, shallowEqual), ...useSelector(selectGanHistogramParams, shallowEqual) });
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanHistogramQuery({
        url: '/forecast/cgan-histogram',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`cGAN histogram for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN histogram for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

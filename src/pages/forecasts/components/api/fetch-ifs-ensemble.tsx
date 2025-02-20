import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchOpenIfsEnsembleQuery } from '@/gateway/slices/open-ifs';
import { selectForecastParams, selectOpenEnsembleParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchOpenIfsEnsemble() {
    const forecast_params = validObjectEntries({ ...useSelector(selectForecastParams, shallowEqual), ...useSelector(selectOpenEnsembleParams, shallowEqual) });
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchOpenIfsEnsembleQuery({
        url: '/open-ifs-forecats/open-ifs-ensemble',
        query: forecast_params
    });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        return (
            <div className="flex flex-column gap-1">
                {data.map((plot) => (
                    <img key={plot.image_url} src={plot.image_url} alt={`Open IFS Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                ))}
            </div>
        );
    } else {
        return <Message severity="error" text={`Failed to fetch Open IFS Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchGanThresholdChanceQuery } from '@/gateway/slices/cgan';
import { selectEnsembleParams, selectGanThresholdParams } from '@/gateway/slices/params';
import { validObjectEntries } from '@/gateway/slices/tools';
import { useAppSelector } from '@/gateway/hooks';

import ThresholdChance from '../threshold-chance';
import ShowPercentage from '../show-percentage';

import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';

export default function FetchGanThresholdChance() {
    const forecast_params = validObjectEntries({ ...useSelector(selectEnsembleParams, shallowEqual), ...useSelector(selectGanThresholdParams, shallowEqual) });
    const {
        data = [],
        isFetching,
        isLoading,
        isSuccess
    } = useFetchGanThresholdChanceQuery({
        url: '/cgan-forecats/cgan-threshold-chance',
        query: forecast_params
    });
    const model = useAppSelector((state) => state.params.ensemble?.model) === 'mvua-kubwa' ? 'Mvua Kubwa' : 'Jurre Brishti';
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess) {
        if (isEmpty(data)) {
                    return <Message severity="warn" text={`cGAN threshold chance products are not ready! Please try again later.`} />
                } else {
        return (
            <div className="card p-4 m-4 shadow-3">
                <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <ThresholdChance />
                        <ShowPercentage />
                    </div>
                    <div className="flex flex-column gap-1">
                        {data.map((plot) => (
                            <img key={plot.image_url} src={plot.image_url} alt={`${model} threshold chance plots for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    } else {
        return <Message severity="error" text={`Failed to fetch cGAN threshold chance plots for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
    }
}

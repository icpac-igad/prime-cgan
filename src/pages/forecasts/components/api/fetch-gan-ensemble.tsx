import { useSelector, shallowEqual } from 'react-redux';
import { Message } from 'primereact/message';
import { useFetchGanEnsembleQuery } from '@/gateway/slices/cgan';
import { selectEnsembleParams, selectGanEnsembleParams } from '@/gateway/slices/params';
import { useAppSelector } from '@/gateway/hooks';

import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';
import MaxEnsemblePlots from '../ensemble-plots';

export default function FetchGanEnsemble() {
    const forecast_params = { ...useSelector(selectEnsembleParams, shallowEqual), ...useSelector(selectGanEnsembleParams, shallowEqual) };
    const model = useAppSelector((state) => state.params?.model) === 'mvua-kubwa' ? 'Mvua Kubwa' : 'Jurre Brishti';
        const {
            data = [],
            isFetching,
            isLoading,
            isSuccess
        } = useFetchGanEnsembleQuery({
            url: '/cgan-forecats/cgan-ensemble',
            query: forecast_params
        });
        if (isFetching || isLoading) {
            return <Spinner />;
        } else if (isSuccess) {
            if (isEmpty(data)) {
            return <Message severity="warn" text={`cGAN ensemble plots are not ready! Please try again later.`} />
        } else {
            return (
                <div className="card p-4 m-4 shadow-3">
                    <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                        <div className="flex flex-row gap-4">
                            <MaxEnsemblePlots forecast="cgan" />
                        </div>
                        <div className="flex flex-column gap-1">
                            {data.map((plot) => (
                                <img key={plot.image_url} src={plot.image_url} alt={`${model} Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                            ))}
                        </div>
                    </div>
                </div>
            );}
        } else {
            return <Message severity="error" text={`Failed to fetch cGAN Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
        }
    }


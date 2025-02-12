import { useSelector, shallowEqual } from 'react-redux';
// import { Message } from 'primereact/message';
import { useFetchGanEnsembleQuery } from '@/gateway/slices/cgan';
import { selectForecastParams, selectGanEnsembleParams } from '@/gateway/slices/params';
import { useAppSelector } from '@/gateway/hooks';

import { isEmpty } from 'lodash-es';
import Spinner from '../spinner';
import ShowEnsemble from '../show-ensemble';
import MaxEnsemblePlots from '../ensemble-plots';

export default function FetchGanEnsemble() {
    const forecast_params = { ...useSelector(selectForecastParams, shallowEqual), ...useSelector(selectGanEnsembleParams, shallowEqual) };
    const show_ensemble = useAppSelector((state) => state.params.cgan?.show_ensemble);

    if (show_ensemble) {
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
                <div className="card p-4 m-4 shadow-3">
                    <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                        <div className="flex flex-column gap-4">
                            <ShowEnsemble forecast="cgan" />
                            <MaxEnsemblePlots forecast="cgan" />
                        </div>
                        <div className="flex flex-column gap-1">
                            {data.map((plot) => (
                                <img key={plot.image_url} src={plot.image_url} alt={`cGAN Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else {
            // return <Message severity="error" text={`Failed to fetch cGAN Ensemble Members for ${forecast_params?.forecast_date} - ${forecast_params?.start_time}`} />;
            return <></>;
        }
    } else {
        return <></>;
    }
}

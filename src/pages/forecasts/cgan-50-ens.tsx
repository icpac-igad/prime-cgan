import { useAppSelector } from '@/gateway/hooks';

// import ShowEnsemble from './components/show-ensemble';
// import MaxEnsemblePlots from './components/ensemble-plots';
// import ThresholdChance from './components/threshold-chance';
// import ShowPercentage from './components/show-percentage';

import * as plotLib from '@/pages/tools/plotsLib';


import FetchGanForecast from './components/api/fetch-gan-forecast';
import FetchGanEnsemble from './components/api/fetch-gan-ensemble';
import FetchGanThresholdChance from './components/api/fetch-gan-threshold-chance';

import { useEffect } from 'react';

export default function CGAN50Ensemble() {
    // const show_ensemble = useAppSelector((state) => state.params.cgan?.show_ensemble);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const valid_time = useAppSelector((state) => state.params?.valid_time);

    useEffect(() => {
        // initialize plots library
        plotLib.init(forecast_date, start_time, valid_time);
    }, [start_time, forecast_date]);


    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <FetchGanForecast />
            <FetchGanEnsemble />
            <FetchGanThresholdChance />
        </div>
    );
}

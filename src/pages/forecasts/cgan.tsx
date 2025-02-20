import { useAppSelector } from '@/gateway/hooks';

// import ShowEnsemble from './components/show-ensemble';
// import MaxEnsemblePlots from './components/ensemble-plots';
import ThresholdChance from './components/threshold-chance';
import ShowPercentage from './components/show-percentage';
import HistogramThresholdValue from './components/threshold-value';

import * as plotLib from '@/pages/tools/plotsLib';

import PlotTypeSelector from './components/plot-type';

import FetchGanForecast from './components/api/fetch-gan-forecast';
import FetchGanEnsemble from './components/api/fetch-gan-ensemble';
import FetchGanThresholdChance from './components/api/fetch-gan-threshold-chance';

import { useEffect } from 'react';

export default function CGANForecasts() {
    // const show_ensemble = useAppSelector((state) => state.params.cgan?.show_ensemble);
    const model = useAppSelector((state) => state.params.cgan?.model);
    const start_time = useAppSelector((state) => state.params?.start_time);
    const forecast_date = useAppSelector((state) => state.params?.forecast_date);
    const valid_time = useAppSelector((state) => state.params?.valid_time);

    useEffect(() => {
        // initialize plots library
        plotLib.init(forecast_date, start_time, valid_time);
    }, [start_time, forecast_date]);

    const getModelInfoNode = () => {
        const infoNode = document.createElement('span');
        const modelInfoList = [
            'The <a href="https://www.ecmwf.int/" target="_blank">ECMWF</a> <a href="https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS" target="_blank">IFS</a> output is post-processed using <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022MS003120" target="_blank">cGAN</a> trained on <a href="https://gpm.nasa.gov/data/imerg" target="_blank"> IMERG</a> v6 from 2018 and 2019 to produce forecasts of 6h rainfall intervals.',
            'The <a href="https://www.ecmwf.int/" target="_blank">ECMWF</a> <a href="https://confluence.ecmwf.int/display/FUG/Section+2+The+ECMWF+Integrated+Forecasting+System+-+IFS" target="_blank">IFS</a> output is post-processed using <a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2022MS003120" target="_blank">cGAN</a> trained on <a href="https://gpm.nasa.gov/data/imerg" target="_blank"> IMERG</a> v7 from 2018 and 2019 to produce forecasts of 24h rainfall intervals.'
        ];
        if (model === 'mvua-kubwa') {
            infoNode.innerHTML = modelInfoList[1];
        } else {
            infoNode.innerHTML = modelInfoList[0];
        }
        return (
            <p
                ref={(nodeElement) => {
                    nodeElement && nodeElement.replaceChildren(infoNode);
                }}
            />
        );
    };

    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">East Africa cGAN rainfall Forecast. (Click for local distribution.)</h1>
            <div className="card">
                <p className="font-medium line-height-3">
                    cGAN forecasts are produced as main deliverables for the Strengthening Early Warning Systems for Anticipatory Action (SEWAA) project which is an innovative project that aims at provision of early warning information that can be
                    utilized in improving the decision-making process by the different stakeholders over Eastern Africa.
                </p>
                <div className="font-medium line-height-3">{getModelInfoNode()}</div>
            </div>

            <div className="card p-4 m-2 shadow-3">
                <div className="flex flex-wrap gap-2 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <PlotTypeSelector />
                        <HistogramThresholdValue />
                        <ThresholdChance />
                        <ShowPercentage />
                    </div>
                    <div className="flex flex-column gap-1">
                        <p className="font-medium line-height-3" id="statusText" style={{ color: 'rgb(204, 0, 0)' }}>
                            Loading borders ...
                        </p>
                        <canvas id="myCanvas" width="1024" height="504">
                            Your browser does not support the HTML canvas tag.
                        </canvas>
                    </div>
                </div>
            </div>
            <>
                <FetchGanForecast />
                <FetchGanEnsemble />
                <FetchGanThresholdChance />
            </>
        </div>
    );
}

import { useAppSelector } from '@/gateway/hooks';

import ShowEnsemble from './components/show-ensemble';
import MaxEnsemblePlots from './components/ensemble-plots';
import ThresholdChance from './components/threshold-chance';
import ShowPercentage from './components/show-percentage';
import LocationSelector from './components/location-selector';
import LatitudeLongitude from './components/location-lat-lon';
import HistogramBins from './components/histogram-bins';
import HistogramCertainity from './components/hist-certainity';
// import ForecastModel from './components/forecast-model';
import PlotType from './components/plot-type';

import SubmitButton from './components/form/submit-button';

import FetchGanForecast from './components/api/fetch-gan-forecast';
import FetchGanEnsemble from './components/api/fetch-gan-ensemble';
import FetchGanThresholdChance from './components/api/fetch-gan-threshold-chance';
import FetchGanHistogram from './components/api/fetch-gan-histogram';

export default function CGANForecasts() {
    const show_ensemble = useAppSelector((state) => state.params.cgan?.show_ensemble);
    const show_histogram = useAppSelector((state) => state.params.cgan?.show_histogram);

    const onShowHistogramPlots = () => {
        console.log('show histogram plot');
    };

    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">cGAN Forecast Products</h1>
            <div className="card">
                <p className="font-medium line-height-3">
                    cGAN forecasts are produced as main deliverables for the Strengthening Early Warning Systems for Anticipatory Action (SEWAA) project which is an innovative project that aims at provision of early warning information that can be
                    utilized in improving the decision-making process by the different stakeholders over Eastern Africa.
                </p>
            </div>

            <div className="card p-4 m-4 shadow-3">
                <div className="flex flex-wrap align-items-center justify-content-center">
                    <FetchGanForecast />
                </div>
                {/* <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <ForecastModel />
                        <SubmitButton {...{ label: 'Refresh Forecast', severity: 'info', iconPos: 'left', icon: 'pi pi-sync', onClick: onGenerateGanForecast, rounded: true }} />
                    </div>
                    <div className="flex flex-wrap align-items-center justify-content-center">
                        <FetchGanForecast />
                    </div>
                </div> */}
            </div>

            <div className="card p-4 m-4 shadow-3">
                <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <ShowEnsemble forecast="cgan" />
                        <MaxEnsemblePlots forecast="cgan" />
                    </div>
                    {show_ensemble && <FetchGanEnsemble />}
                </div>
            </div>

            <div className="card p-4 m-4 shadow-3">
                <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <ThresholdChance />
                        <ShowPercentage />
                    </div>
                    <FetchGanThresholdChance />
                </div>
            </div>

            <div className="card p-4 shadow-3">
                <div className="flex flex-wrap gap-4 align-items-left justify-content-start">
                    <div className="flex flex-column gap-4">
                        <LocationSelector />
                        <PlotType />
                        <LatitudeLongitude target="latitude" />
                        <LatitudeLongitude target="longitude" />
                        <HistogramBins />
                        <HistogramCertainity />
                        <SubmitButton {...{ label: 'Refresh/Show Histogram', severity: 'info', iconPos: 'left', icon: 'pi pi-sync', onClick: onShowHistogramPlots, rounded: true }} />
                    </div>
                    {show_histogram && <FetchGanHistogram />}
                </div>
            </div>
        </div>
    );
}

import FetchGanForecast from './components/api/fetch-gan-forecast';
import FetchGanEnsemble from './components/api/fetch-gan-ensemble';
import FetchGanThresholdChance from './components/api/fetch-gan-threshold-chance';


export default function CGAN50Ensemble() {

    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <FetchGanForecast />
            <FetchGanEnsemble />
            <FetchGanThresholdChance />
        </div>
    );
}

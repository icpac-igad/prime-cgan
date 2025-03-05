import FetchOpenIfsForecast from './components/api/fetch-ifs-forecasts';
import FetchOpenIfsEnsemble from './components/api/fetch-ifs-ensemble';
import { useAppSelector } from '@/gateway/hooks';

export default function OpenIFSForecasts() {
    const show_ensemble = useAppSelector((state) => state.params.open_ifs?.show_ensemble || false);
    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">ECMWF Open IFS Forecast Products</h1>
            <div className="card">
                <p className="font-medium line-height-3">
                    <a href="https://www.ecmwf.int/en/research/projects/openifs" target="_blank">
                        ECMWF IFS(Integrated Forecasting System){' '}
                    </a>
                    includes a sophisticated data assimilation system and global numerical model of the Earth system, as well as supporting infrastructure to make forecast products available to our Member and Co-operating States and other users. The
                    data assimilation system combines the latest weather observations with a recent forecast to obtain the best possible estimate of the current state of the Earth system. A detailed Open IFS data attributes catalogue can be{' '}
                    <a href="https://confluence.ecmwf.int/display/DAC/ECMWF+open+data:+real-time+forecasts+from+IFS+and+AIFS" target="_blank">
                        found here
                    </a>
                </p>
            </div>

            <div className="card p-4 m-4 shadow-4">
                <div className="flex flex-wrap gap-6 align-items-center justify-content-center">
                    <FetchOpenIfsForecast />
                </div>
            </div>
            {show_ensemble && (
                <div className="card p-4 shadow-4">
                    <div className="flex flex-wrap gap-4 align-items-center justify-content-center">
                        <FetchOpenIfsEnsemble />
                    </div>
                </div>
            )}
        </div>
    );
}

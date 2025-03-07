import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

import CGAN1000Ensemble from './cgan-1000-ens';
import CGAN50Ensemble from './cgan-50-ens';
import OpenIFSForecasts from './open-ifs';
import GEFSForecasts from './gefs';
import IFrame from 'react-iframe';

import { onActiveIndexPageChange } from '@/gateway/slices/params';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';

import ForecastModel from './components/forecast-model';

import VisualizationParameter from './components/vis-parameter';
import MaskAreaSelect from './components/area-of-interest';
import ColorStyleSelect from './components/color-styles';
import AccTimeSelect from './components/acc-time';
import PlotUnitsSelect from './components/plot-units';
import ForecastDateSelect from './components/forecast-date';
import ForecastTimeSelect from './components/forecast-time';
import ValidTimeSelect from './components/forecast-validity';

import ShowEnsemble from './components/show-ensemble';

import ThresholdChance from './components/threshold-chance';
import ShowPercentage from './components/show-percentage';
import HistogramThresholdValue from './components/threshold-value';

import PlotTypeSelector from './components/plot-type';

import { onForecastParamChange } from '@/gateway/slices/params';

const ExternalSystem = () => {
    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">Embeded External Early Information System</h1>
            <IFrame url="https://eahazardswatch.icpac.net/map/ea/" width="100%" height="718" overflow="hidden" frameBorder={0} loading="lazy" position="relative" allowFullScreen />
        </div>
    );
};

export default function ForecastsPage() {
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const dispatch = useAppDispatch();

    const itemRenderer = (item: MenuItem, itemIndex: number) => (
        <Link to={item?.url || '#'} className="p-menuitem-link flex align-items-center gap-2" onClick={() => dispatch(onActiveIndexPageChange(itemIndex))}>
            <span className={item.icon} />
            <span className="mx-2 font-bold">{item.label}</span>
        </Link>
    );
    const items: MenuItem[] = [
        { label: 'cGAN 1000 Ensemble', icon: 'pi pi-microchip-ai', url: '/forecast-systems/', template: (item) => itemRenderer(item, 0) },
        { label: 'cGAN 50 Ensemble', icon: 'pi pi-microchip', url: '/forecast-systems/?q=cgan-50-ensemble', template: (item) => itemRenderer(item, 1) },
        {
            label: 'Open IFS Forecasts',
            icon: 'pi pi-folder-open',
            url: '/forecast-systems/?q=open-ifs',
            template: (item) => itemRenderer(item, 2)
        },
        { label: 'GEFS Forecasts', disabled: true, icon: 'pi pi-objects-column', url: '/forecast-systems/?q=gefs', template: (item) => itemRenderer(item, 3) },
        { label: 'Embeded External System', icon: 'pi pi-external-link', url: '/forecast-systems/?q=embed', template: (item) => itemRenderer(item, 4) }
    ];

    const [searchParams] = useSearchParams();

    useEffect(() => {
        switch (searchParams.get('q')) {
            case 'embed':
                dispatch(onActiveIndexPageChange(4));
                break;
            case 'gefs':
                dispatch(onActiveIndexPageChange(3));
                break;
            case 'open-ifs':
                dispatch(onActiveIndexPageChange(2));
                break;
            case 'cgan-50-ensemble':
                dispatch(onForecastParamChange({ model: 'jurre-brishti-count' }));
                dispatch(onActiveIndexPageChange(1));
                break;
            default:
                dispatch(onForecastParamChange({ model: 'jurre-brishti-ens' }));
                dispatch(onActiveIndexPageChange(0));
        }
    }, [searchParams]);



    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-3xl text-center font-bold">Forecasting Systems and Generated Products</h1>

            <div className="card shadow-2 p-4 mb-6 mt-4 ">
                <div className="flex flex-wrap gap-2 align-items-left justify-content-start">
                    {[0, 1].includes(activePage) && (
                        <>
                            <ForecastModel />
                            <MaskAreaSelect />
                        </>
                    )}
                    {activePage === 2 && <VisualizationParameter />}
                    <ForecastDateSelect />
                    {[0, 1].includes(activePage) && (
                        <>
                            <ForecastTimeSelect />
                            <ValidTimeSelect />
                        </>
                    )}
                    <PlotUnitsSelect />
                    {[0, 1].includes(activePage) && <AccTimeSelect />}
                    <ColorStyleSelect />
                    {activePage == 2 && <ShowEnsemble />}
                    {activePage === 0 && (
                        <>
                            <PlotTypeSelector />
                            <HistogramThresholdValue />
                            <ThresholdChance />
                            <ShowPercentage />
                        </>
                    )}
                </div>
            </div>

            <div className="card">
                <TabMenu model={items} activeIndex={activePage} onTabChange={(e) => dispatch(onActiveIndexPageChange(e.index))} />
            </div>
            {activePage === 4 ? <ExternalSystem /> : activePage === 3 ? <GEFSForecasts /> : activePage === 2 ? <OpenIFSForecasts /> : activePage === 1 ? <CGAN50Ensemble /> : <CGAN1000Ensemble />}
        </div>
    );
}

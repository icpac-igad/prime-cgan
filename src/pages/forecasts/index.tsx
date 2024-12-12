import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

import CGANForecasts from './cgan';
import OpenIFSForecasts from './open-ifs';
import GEFSForecasts from './gefs';
import IFrame from 'react-iframe';

import { useFetchForecastDatesQuery } from '@/gateway/slices/settings';
import { onForecastParamChange, onActiveIndexPageChange } from '@/gateway/slices/params';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';

import VisualizationParameter from './components/vis-parameter';
import MaskAreaSelect from './components/area-of-interest';
import ColorStyleSelect from './components/color-styles';
import AccTimeSelect from './components/acc-time';
import PlotUnitsSelect from './components/plot-units';
import ForecastDateSelect from './components/forecast-date';
import ForecastTimeSelect from './components/forecast-time';

import ShowEnsemble from './components/show-ensemble';

import { isEmpty } from 'lodash';

const ExternalSystem = () => {
    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-2xl text-left font-semibold">Embended External Forecasting Systems</h1>
            <IFrame url="http://megacorr.dynu.net/ICPAC/cGAN_examplePlots/fastData.html" width="100%" height="718" overflow="hidden" frameBorder={0} loading="lazy" position="relative" allowFullScreen />
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
        { label: 'cGAN Forecasts', icon: 'pi pi-microchip-ai', url: '/forecast-systems/', template: (item) => itemRenderer(item, 0) },
        {
            label: 'Open IFS Forecasts',
            icon: 'pi pi-folder-open',
            url: '/forecast-systems/?q=open-ifs',
            template: (item) => itemRenderer(item, 1)
        },
        { label: 'GEFS Forecasts', disabled: true, icon: 'pi pi-objects-column', url: '/forecast-systems/?q=gefs', template: (item) => itemRenderer(item, 2) },
        { label: 'Embended External System', icon: 'pi pi-external-link', url: '/forecast-systems/?q=embed', template: (item) => itemRenderer(item, 3) }
    ];

    const [searchParams] = useSearchParams();

    useEffect(() => {
        switch (searchParams.get('q')) {
            case 'embed':
                dispatch(onActiveIndexPageChange(3));
                break;
            case 'gefs':
                dispatch(onActiveIndexPageChange(2));
                break;
            case 'open-ifs':
                dispatch(onActiveIndexPageChange(1));
                break;
            default:
                dispatch(onActiveIndexPageChange(0));
        }
    }, [searchParams]);

    const { data: datesData = [], isFetching: datesFetching, isSuccess: datesSuccess, isLoading: datesLoading } = useFetchForecastDatesQuery({ url: '/settings/data-dates', query: { forecast: activePage === 0 ? 'cgan-forecast' : 'open-ifs' } });
    if (!datesLoading && datesSuccess && !isEmpty(datesData)) {
        dispatch(onForecastParamChange({ forecast_date: datesData[0].date }));
    }

    return (
        <div className="shadow-0 mx-4 px-4 pt-2 pb-8">
            <h1 className="text-3xl text-center font-bold">Forecasting Systems and Generated Products</h1>

            <div className="card">
                <p className="font-medium line-height-3">
                    With climate change exacerbating the frequency and intensity of natural hazard induced disasters, timely and accurate early warning systems are more critical than ever. The Google.org-funded project aims to address this urgent
                    need by leveraging cutting-edge technology and innovative approaches to improve the effectiveness of early warning information generation .By harnessing the latest advancements in artificial intelligence, machine learning, and
                    data analytics, the project aims to enhance the accuracy and timeliness of disaster alerts, enabling communities to take proactive measures to mitigate risks and protect lives and livelihoods.
                </p>
            </div>

            <div className="card shadow-2 p-4 mb-6 mt-4 ">
                <div className="flex flex-wrap gap-2 align-items-left justify-content-start">
                    {activePage == 1 && <VisualizationParameter />}
                    <MaskAreaSelect />
                    <ForecastDateSelect data={datesData} isFetching={datesFetching} isLoading={datesLoading} isSuccess={datesSuccess} />
                    {activePage === 0 && <ForecastTimeSelect />}
                    <PlotUnitsSelect />
                    {activePage === 0 && <AccTimeSelect />}
                    <ColorStyleSelect />
                    {activePage == 1 && <ShowEnsemble forecast="open-ifs" />}
                </div>
            </div>

            <div className="card">
                <TabMenu model={items} activeIndex={activePage} onTabChange={(e) => dispatch(onActiveIndexPageChange(e.index))} />
            </div>
            {activePage === 3 ? <ExternalSystem /> : activePage === 2 ? <GEFSForecasts /> : activePage === 1 ? <OpenIFSForecasts /> : <CGANForecasts />}
        </div>
    );
}

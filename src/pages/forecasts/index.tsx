import { useSearchParams, Link } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import CGANForecasts from './cgan';
import OpenIFSForecasts from './open-ifs';
import GEFSForecasts from './gefs';
import IFrame from 'react-iframe';

const ExternalSystem = () => {
    return <IFrame url="http://megacorr.dynu.net/ICPAC/cGAN_examplePlots/fastData.html" width="100%" height="718" overflow="hidden" frameBorder={0} loading="lazy" position="relative" allowFullScreen />;
};

export default function ForecastsPage() {
    const itemRenderer = (item: MenuItem) => (
        <Link to={item?.url || '#'} className="p-menuitem-link flex align-items-center gap-2">
            <span className={item.icon} />
            <span className="mx-2 font-bold">{item.label}</span>
        </Link>
    );
    const items: MenuItem[] = [
        { label: 'cGAN Forecasts', icon: 'pi pi-microchip-ai', url: '/forecast-systems/', template: (item) => itemRenderer(item) },
        {
            label: 'Open IFS Forecasts',
            icon: 'pi pi-folder-open',
            url: '/forecast-systems/?q=open-ifs',
            template: (item) => itemRenderer(item)
        },
        { label: 'GEFS Forecasts', icon: 'pi pi-objects-column', url: '/forecast-systems/?q=gefs', template: (item) => itemRenderer(item) },
        { label: 'Embended External System', icon: 'pi pi-external-link', url: '/forecast-systems/?q=embed', template: (item) => itemRenderer(item) }
    ];

    let [searchParams] = useSearchParams();
    let activeIndex;
    switch (searchParams.get('q')) {
        case 'embed':
            activeIndex = 3;
            break;
        case 'gefs':
            activeIndex = 2;
            break;
        case 'open-ifs':
            activeIndex = 1;
            break;
        default:
            activeIndex = 0;
    }
    return (
        <>
            <h1 className="text-5xl">This is Forecast Products Index Page</h1>
            <div className="card">
                <div className="card">
                    <TabMenu model={items} activeIndex={activeIndex} />
                </div>
            </div>
            {activeIndex === 3 ? <ExternalSystem /> : activeIndex === 2 ? <GEFSForecasts /> : activeIndex === 1 ? <OpenIFSForecasts /> : <CGANForecasts />}
        </>
    );
}

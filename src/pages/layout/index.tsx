import HeaderComponent from './header';
import HeroComponent from './hero';
import ResourcesComponent from './resources';
import FeaturedComponent from './featured';
import ForecastsComponent from './forecasts';
import TimelinesComponent from './timelines';
import FooterComponent from './footer';

export default function LandingPage() {
    return (
        <div className="surface-0 flex justify-content-center layout-main">
            <div id="home" className="landing-wrapper overflow-hidden">
                <HeaderComponent />
                <HeroComponent />
                <ForecastsComponent />
                <FeaturedComponent />
                <ResourcesComponent />
                <TimelinesComponent />
                <FooterComponent />
            </div>
        </div>
    );
}

import HeroComponent from './hero';
import ResourcesComponent from './resources';
import FeaturedComponent from './featured';
import ForecastsComponent from './forecasts';
import TimelinesComponent from './timelines';

export default function HomePage() {
    return (
        <>
            <HeroComponent />
            <ForecastsComponent />
            <FeaturedComponent />
            <ResourcesComponent />
            <TimelinesComponent />
        </>
    );
}

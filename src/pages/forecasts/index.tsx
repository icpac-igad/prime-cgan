import { Outlet } from 'react-router-dom';

export default function ForecastsPage() {
    return (
        <>
            <h1 className="text-5xl">This is Forecast Products Index Page</h1>
            <Outlet />
        </>
    );
}

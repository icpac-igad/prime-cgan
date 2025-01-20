import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HttpError } from '@/pages/tools/types';

export default function NotFound() {
    const error: HttpError | unknown = useRouteError();
    console.error(error);

    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div className="flex flex-wrap align-items-center justify-content-center">
                    <div className="border-round bg-green-300 w-14rem p-3 m-2">
                        <div className="max-w-full border-round bg-green-800 font-bold p-1 flex align-items-center justify-content-center">
                            <img src="/images/layout/ICPAC_Logo_White.svg" alt="ICPAC logo" className="w-6rem" />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(161, 195, 132, 1) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    {isRouteErrorResponse(error) && (
                        <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                            <span className="text-blue-500 font-bold text-3xl">
                                {error?.status || '404'} - {error?.statusText || 'Not Found'}
                            </span>
                            <h1 className="text-900 font-bold text-2xl mb-2">{error?.data || 'Requested resource is not available'}</h1>
                            <div className="text-600 mb-5">Please use any of the below options to explore other available options</div>
                            <Link to="/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-cyan-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="text-50 pi pi-fw pi-home text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Browse Home Page</span>
                                    <span className="text-600 lg:text-lg">If you are lost, this is the best place-mark to find your way!</span>
                                </span>
                            </Link>
                            <Link to="/forecast-systems/" className="w-full flex align-items-center py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-orange-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="pi pi-fw pi-globe text-50 text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Explore Forecasting Systems</span>
                                    <span className="text-600 lg:text-lg">A collection of tools and products produced by forecasting models.</span>
                                </span>
                            </Link>
                            <Link to={import.meta.env.VITE_FTP_DATA_URL || '/ftp/'} className="w-full flex align-items-center mb-5 py-5 border-300 border-bottom-1">
                                <span className="flex justify-content-center align-items-center bg-indigo-400 border-round" style={{ height: '3.5rem', width: '3.5rem' }}>
                                    <i className="pi pi-fw pi-download text-50 text-2xl"></i>
                                </span>
                                <span className="ml-4 flex flex-column">
                                    <span className="text-900 lg:text-xl font-medium mb-1">Access Forecasts Data</span>
                                    <span className="text-600 lg:text-lg">Gateway to forecast data repository </span>
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

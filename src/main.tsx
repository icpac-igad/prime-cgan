'use client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '@/gateway/store';

import LayoutPage from './pages/layout';
import NotFound from './pages/layout/not-found';
import HomePage from './pages/home';
import MapviewerPage from './pages/mapviewer';
import ForecastsPage from './pages/forecasts';
import ResourcesPage from './pages/resources';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import OpenIfsForecasts from './pages/forecasts/open-ifs';
import CGAN1000Ensemble from './pages/forecasts/cgan-1000-ens';
import CGAN50Ensemble from './pages/forecasts/cgan-50-ens'
import GEFSForecasts from './pages/forecasts/gefs';

import * as serviceWorker from './serviceWorker.ts';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/landing.scss';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LayoutPage />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomePage /> },
                { element: <MapviewerPage />, path: '/mapviewer/' },
                {
                    element: <ForecastsPage />,
                    path: '/forecast-systems/',
                    children: [
                        { element: <CGAN1000Ensemble />, index: true },
                        { element: <CGAN50Ensemble />, path: '/forecast-systems/?q=cgan-50-ensemble' },
                        { element: <OpenIfsForecasts />, path: '/forecast-systems/?q=open-ifs' },
                        { element: <GEFSForecasts />, path: '/forecast-systems/?q=gefs' }
                    ]
                },
                { element: <AboutPage />, path: '/project-info/' },
                { element: <ResourcesPage />, path: '/useful-links/' },
                { element: <ContactPage />, path: '/contact-us/' }
            ]
        }
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true
        }
    }
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PrimeReactProvider value={{ autoZIndex: true, ripple: true, locale: 'en' }}>
                <RouterProvider
                    router={router}
                    future={{
                        v7_startTransition: true
                    }}
                />
            </PrimeReactProvider>
        </Provider>
    </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

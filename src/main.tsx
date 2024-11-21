'use client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import LayoutPage from './pages/layout';
import * as serviceWorker from './serviceWorker.ts';
import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/landing.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider value={{ autoZIndex: true, ripple: true, locale: 'en' }}>
            <LayoutPage />
        </PrimeReactProvider>
    </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

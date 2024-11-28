import * as types from './types';

export const pages: types.NavigationItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Forecast Systems', url: '/forecast-systems/' },
    { name: 'Mapviewer', url: '/mapviewer/' },
    { name: 'Resources', url: '/useful-links/' },
    { name: 'Contact Us', url: '/contact-us/' }
];

export const products: types.ForecastProduct[] = [
    {
        title: 'cGAN 6h Forecasts',
        text: ' State-of-the-art AI-based weather models to give more accurate and local predictions enabling particular countries and regions to better anticipate and prepare for extreme weather.',
        icon: 'pi pi-microchip-ai',
        url: '/forecast-systems/'
    },
    {
        title: 'ECMWF IFS Ensemble Forecast',
        text: 'The IFS is a sophisticated data assimilation system combined with a global numerical model of the Earth system, supported by infrastructure to make forecast products available to Member and Co-operating States, and other users.',
        icon: 'pi pi-folder-open',
        url: '/forecast-systems/?q=open-ifs'
    },
    {
        title: 'Global Ensemble Forecast System (GEFS)',
        text: 'A weather forecasting model developed by the National Centers for Environmental Prediction (NCEP). It generates 21 separate forecasts, or ensemble members, to address underlying uncertainties in the input data and model limitations. Each forecast compensates for a different set of uncertainties, resulting in a range of potential outcomes.',
        icon: 'pi pi-objects-column',
        url: '/forecast-systems/?q=gefs'
    },
    {
        title: 'Embended External System',
        text: 'Forecast products sourced from partner systems and embended as-is.',
        icon: 'pi pi-external-link',
        url: '/forecast-systems/?q=embed'
    }
];

export const resources: types.ResourceItem[] = [
    {
        title: 'Inception Press Brief',
        text: 'Meeting Held On April 29, 2024, in Nairobi, Kenya',
        icon: 'pi pi-fw pi-users text-2xl text-yellow-700',
        bg_color: 'bg-yellow-200',
        url: 'https://www.icpac.net/news/icpac-receives-googleorg-funding-through-the-un-wfp-to-enhance-disaster-preparedness-in-eastern-africa/'
    },
    {
        title: 'State-of-the-art weather models',
        text: 'Climate scientists turn to AI for precise and timely weather forecasts in Africa',
        icon: 'pi pi-fw pi-map text-2xl text-blue-700',
        bg_color: 'bg-blue-200',
        url: 'https://www.theafricareport.com/367720/climate-scientists-turns-to-ai-for-precise-and-timely-weather-forecasts-in-africa/'
    },
    {
        title: 'Addressing Climate Disasters in Eastern Africa',
        text: 'E4DRR aims to enhance early warning systems through impact-based forecasting using event-based climate storylines, hazard modeling, and impact estimation.',
        icon: 'pi pi-fw pi-globe text-2xl text-purple-700',
        bg_color: 'bg-purple-200',
        url: 'https://www.icpac.net/news/icpacs-project-selected-by-crafd-to-address-climate-disasters-in-eastern-africa/'
    },
    {
        title: 'Download Data',
        text: 'Please click here to download cGAN, ECMWF Open IFS and aggregated ECMWF IFS forecasts data for analysis on other tools than this web interface',
        icon: 'pi pi-database text-2xl text-green-700',
        bg_color: 'bg-blue-200',
        url: 'https://cgan.icpac.net/ftp/'
    },
    {
        title: 'cGAN Model Source Code',
        text: 'Use this link for instructions on how to setup cGAN source code used for adding ensemble mean and variance predictors on IFS model',
        icon: 'pi pi-github text-2xl text-white-700',
        bg_color: 'bg-grey-200',
        url: 'https://github.com/Fenwick-Cooper/ensemble-cgan'
    }
];

export const timelines: types.TimelineItem[] = [
    {
        title: 'Project Objective',
        text: 'Assess the skilfulness and sustainability of developing a cloud-based machine learning post processing technique for improved high-impact weather forecasts. This will be implemented in phases as described below.',
        start_date: 'May 2023',
        final_date: 'December 2026',
        icon: 'pi pi-check-circle',
        color: 'green',
        image: '/images/timelines/sewaa-project-implementation-phases.png'
    },
    {
        title: 'Year 1 Outcomes',
        text: 'Concerned about downscaling of cGAN for daily weather forecasts valid at 6 hours time step. During this period, 6h forecasts produces were availed through an interactive visualization platform for use and verification. Supported visualizations included maps, threshold exceedence chance and location histograms.',
        start_date: 'May 2023',
        final_date: 'June 2024',
        icon: 'pi pi-hourglass',
        color: 'blue',
        image: '/images/timelines/cgan-outputs-visualization.png'
    },
    {
        title: 'Year 2 Outcomes',
        text: 'Second year was used to evaluate skillfulness of the forecasts and assess effectiveness of producing the forecasts. Additionali, other activities such as assessment on hardware and software requirements, training and capacity building, cGAN model review and improvements were carried out.',
        start_date: 'July 2024',
        final_date: 'June 2025',
        icon: 'pi pi-spinner-dotted',
        color: 'grey',
        image: '/images/timelines/sewaa-cgan-training-workshop.png'
    },
    {
        title: 'Year 3 Outcomes',
        text: 'Year three focuses on finalising daily 6h weather forecasting model verification and operationalization and extension of the model to produce 7-day, sub-seasonal and seasonal forecasts.',
        start_date: 'July 2025',
        final_date: 'June 2026',
        icon: 'pi pi-spinner-dotted',
        color: 'grey',
        image: '/images/timelines/kmd-evaluation-of-cgan.png'
    }
];

export const partners: types.FooterItem[] = [
    { name: 'ICPAC', logo: '/images/layout/ICPAC_Website_Header_Logo.svg', url: 'https://www.icpac.net/', width: 238 },
    { name: 'WFP', logo: '/images/layout/wfp-logo-standard-white-en.png', url: 'https://www.wfp.org/', width: 238 },
    { name: 'University of Oxford', logo: '/images/layout/oxford-large.png', url: 'https://www.physics.ox.ac.uk/', width: 238 },
    { name: 'EMI', logo: '/images/layout/emi-logo-large.png', url: 'http://www.ethiomet.gov.et/', width: 238 },
    { name: 'KMD', logo: '/images/layout/meteor-department-kenya.jpeg', url: 'https://meteo.go.ke/', width: 238 },
    { name: 'ECMWF', logo: '/images/layout/ecmwf-logo-white.png', url: 'https://www.ecmwf.int/', width: 238 },
    { name: 'Google Org', logo: '/images/layout/logo_Google.org_Support_FullColor.png', url: 'https://www.google.org/', width: 238 }
];

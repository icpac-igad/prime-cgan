import * as types from './types';

export const pages: types.NavigationItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Mapviewer', url: '/mapviewer/' },
    { name: 'Forecast Systems', url: '/forecast-systems/' },
    { name: 'Resources', url: '/useful-links/' },
    { name: 'Contact Us', url: '/contact-us/' }
];

export const products: types.ForecastProduct[] = [
    {
        title: 'cGAN 6h Forecasts',
        text: ' State-of-the-art AI-based weather models to give more accurate and local predictions enabling particular countries and regions to better anticipate and prepare for extreme weather.',
        icon: 'pi pi-microchip-ai',
        url: '/forecast-systems/cgan-6h-forecasts/'
    },
    {
        title: 'ECMWF IFS Ensemble Forecast',
        text: 'The IFS is a sophisticated data assimilation system combined with a global numerical model of the Earth system, supported by infrastructure to make forecast products available to Member and Co-operating States, and other users.',
        icon: 'pi pi-globe',
        url: '/forecast-systems/ecmwf-open-ifs/'
    },
    {
        title: 'Global Ensemble Forecast System (GEFS)',
        text: 'A weather forecasting model developed by the National Centers for Environmental Prediction (NCEP). It generates 21 separate forecasts, or ensemble members, to address underlying uncertainties in the input data and model limitations. Each forecast compensates for a different set of uncertainties, resulting in a range of potential outcomes.',
        icon: 'pi pi pi-desktop',
        url: '/forecast-systems/gefs-forecasts/'
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
    }
];

export const timelines: types.TimelineItem[] = [
    {
        title: 'Outcome 1',
        text: 'National stakeholders benefit from improved historical weather observational datasets  and capacity to collect non-traditional weather observations',
        start_date: 'August 2023',
        final_date: 'July 2024',
        icon: 'pi pi-check-circle',
        color: 'green',
        image: '/images/layout/noaa--urO88VoCRE-unsplash.jpg'
    },
    {
        title: 'Outcome 2',
        text: 'National and regional stakeholders benefit from improved capacity to generate high resolution calibrated probabilistic weather forecasts',
        start_date: 'August 2024',
        final_date: 'July 2025',
        icon: 'pi pi-hourglass',
        color: 'purple',
        image: '/images/layout/cgan-forecast-model-pipeline.png'
    },
    {
        title: 'Outcome 3',
        text: 'National and regional stakeholders benefit from improved capacity to generate high resolution calibrated probabilistic weather forecasts',
        start_date: 'August 2025',
        final_date: 'July 2026',
        icon: 'pi pi-plus-circle',
        color: 'grey',
        image: '/images/layout/cgan-forecast-model-pipeline.png'
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

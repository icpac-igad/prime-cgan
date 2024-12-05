import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ForecastMap, type GetOpenIfsForecastEnsemblePlotsForecastOpenIfsEnsembleGetData, type GetOpenIfsForecastForecastOpenIfsGetData } from '@/client';

export const openIfsApiSlice = createApi({
    reducerPath: 'open-ifs',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchOpenIfsForecast: builder.query<ForecastMap[], GetOpenIfsForecastForecastOpenIfsGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) }),
        fetchOpenIfsEnsemble: builder.query<ForecastMap[], GetOpenIfsForecastEnsemblePlotsForecastOpenIfsEnsembleGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) })
    })
});

export const { useFetchOpenIfsForecastQuery, useFetchOpenIfsEnsembleQuery } = openIfsApiSlice;

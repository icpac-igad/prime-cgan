import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type ForecastMap,
    type GetCganHistogramPlotForecastCganHistogramGetData,
    type GetCganThesholdChancePlotForecastCganThresholdChanceGetData,
    type GetCganForecastEnsemblePlotForecastCganEnsembleGetData,
    type GetCganForecastForecastCganForecastGetData
} from '@/client';

export const ganApiSlice = createApi({
    reducerPath: 'cgan',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchGanForecast: builder.query<ForecastMap[], GetCganForecastForecastCganForecastGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) }),
        fetchGanEnsemble: builder.query<ForecastMap[], GetCganForecastEnsemblePlotForecastCganEnsembleGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) }),
        fetchGanHistogram: builder.query<ForecastMap[], GetCganHistogramPlotForecastCganHistogramGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) }),
        fetchGanThresholdChance: builder.query<ForecastMap[], GetCganThesholdChancePlotForecastCganThresholdChanceGetData>({ query: (params) => ({ url: params.url, method: 'GET', body: params }) })
    })
});

export const { useFetchGanForecastQuery, useFetchGanEnsembleQuery, useFetchGanHistogramQuery, useFetchGanThresholdChanceQuery } = ganApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    type ForecastMap,
    type GetCganHistogramPlotForecastCganHistogramGetData,
    type GetCganThesholdChancePlotForecastCganThresholdChanceGetData,
    type GetCganForecastEnsemblePlotForecastCganEnsembleGetData,
    type GetCganForecastForecastCganForecastGetData
} from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash';

export const ganApiSlice = createApi({
    reducerPath: 'cgan',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchGanForecast: builder.query<ForecastMap[], GetCganForecastForecastCganForecastGetData>({
            query: (params) => ({ url: `${`${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' })
        }),
        fetchGanEnsemble: builder.query<ForecastMap[], GetCganForecastEnsemblePlotForecastCganEnsembleGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchGanHistogram: builder.query<ForecastMap[], GetCganHistogramPlotForecastCganHistogramGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchGanThresholdChance: builder.query<ForecastMap[], GetCganThesholdChancePlotForecastCganThresholdChanceGetData>({
            query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' })
        })
    })
});

export const { useFetchGanForecastQuery, useFetchGanEnsembleQuery, useFetchGanHistogramQuery, useFetchGanThresholdChanceQuery } = ganApiSlice;

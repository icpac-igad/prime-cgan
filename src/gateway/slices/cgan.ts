import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ForecastMap, type GetCganForecastCganForecatsCganForecastGetData, type GetCganForecastEnsemblePlotCganForecatsCganEnsembleGetData, type GetCganThesholdChancePlotCganForecatsCganThresholdChanceGetData } from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash-es';

export const ganApiSlice = createApi({
    reducerPath: 'cgan',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchGanForecast: builder.query<ForecastMap[], GetCganForecastCganForecatsCganForecastGetData>({
            query: (params) => ({ url: `${`${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`}`, method: 'GET' })
        }),
        fetchGanEnsemble: builder.query<ForecastMap[], GetCganForecastEnsemblePlotCganForecatsCganEnsembleGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchGanThresholdChance: builder.query<ForecastMap[], GetCganThesholdChancePlotCganForecatsCganThresholdChanceGetData>({
            query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' })
        })
    })
});

export const { useFetchGanForecastQuery, useFetchGanEnsembleQuery, useFetchGanThresholdChanceQuery } = ganApiSlice;

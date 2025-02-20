import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ForecastMap, type GetOpenIfsForecastEnsemblePlotsOpenIfsForecatsOpenIfsEnsembleGetData, type GetOpenIfsForecastOpenIfsForecatsOpenIfsGetData } from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash-es';

export const openIfsApiSlice = createApi({
    reducerPath: 'open-ifs',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchOpenIfsForecast: builder.query<ForecastMap[], GetOpenIfsForecastOpenIfsForecatsOpenIfsGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchOpenIfsEnsemble: builder.query<ForecastMap[], GetOpenIfsForecastEnsemblePlotsOpenIfsForecatsOpenIfsEnsembleGetData>({
            query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' })
        })
    })
});

export const { useFetchOpenIfsForecastQuery, useFetchOpenIfsEnsembleQuery } = openIfsApiSlice;

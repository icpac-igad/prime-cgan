import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ForecastMap, type GetOpenIfsForecastEnsemblePlotsForecastOpenIfsEnsembleGetData, type GetOpenIfsForecastForecastOpenIfsGetData } from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash-es';

export const openIfsApiSlice = createApi({
    reducerPath: 'open-ifs',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchOpenIfsForecast: builder.query<ForecastMap[], GetOpenIfsForecastForecastOpenIfsGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchOpenIfsEnsemble: builder.query<ForecastMap[], GetOpenIfsForecastEnsemblePlotsForecastOpenIfsEnsembleGetData>({
            query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' })
        })
    })
});

export const { useFetchOpenIfsForecastQuery, useFetchOpenIfsEnsembleQuery } = openIfsApiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type MaskArea, type ForecastDate, type VisualizationColorStyle, type GetMaskAreasSettingsMaskAreasGetData, type GetForecastDatesSettingsDataDatesGetData, type GetColorStylesSettingsColorStylesGetData } from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash';
export const settingsApiSlice = createApi({
    reducerPath: 'settings',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchMaskAreas: builder.query<MaskArea[], GetMaskAreasSettingsMaskAreasGetData>({ query: (params) => ({ url: params.url, method: 'GET' }) }),
        fetchColorStyles: builder.query<VisualizationColorStyle[], GetColorStylesSettingsColorStylesGetData>({ query: (params) => ({ url: params.url, method: 'GET' }) }),
        fetchForecastDates: builder.query<ForecastDate[], GetForecastDatesSettingsDataDatesGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) })
    })
});

export const { useFetchMaskAreasQuery, useFetchForecastDatesQuery, useFetchColorStylesQuery } = settingsApiSlice;

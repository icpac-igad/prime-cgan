import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type MaskArea, type ForecastDate, type ForecastModel, type ForecastInitTime, type VisualizationColorStyle, type GetMaskAreasSettingsMaskAreasGetData, type GetForecastDatesSettingsDataDatesGetData, type GetColorStylesSettingsColorStylesGetData, type GetForecastInitTimeSettingsForecastInitTimeGetData, type GetGanForecastModelsSettingsGanForecastModelsGetData } from '@/client';
import { urlEncodeParams } from './tools';
import { isEmpty } from 'lodash-es';
export const settingsApiSlice = createApi({
    reducerPath: 'settings',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}`
    }),
    endpoints: (builder) => ({
        fetchMaskAreas: builder.query<MaskArea[], GetMaskAreasSettingsMaskAreasGetData>({ query: (params) => ({ url: params.url, method: 'GET' }) }),
        fetchColorStyles: builder.query<VisualizationColorStyle[], GetColorStylesSettingsColorStylesGetData>({ query: (params) => ({ url: params.url, method: 'GET' }) }),
        fetchForecastDates: builder.query<ForecastDate[], GetForecastDatesSettingsDataDatesGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        FetchForecastInitTime: builder.query<ForecastInitTime[], GetForecastInitTimeSettingsForecastInitTimeGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
        fetchForecastModels: builder.query<ForecastModel[], GetGanForecastModelsSettingsGanForecastModelsGetData>({ query: (params) => ({ url: `${params.url}?${urlEncodeParams(!isEmpty(params?.query) ? params?.query : {})}`, method: 'GET' }) }),
    })
});

export const { useFetchMaskAreasQuery, useFetchForecastDatesQuery, useFetchColorStylesQuery, useFetchForecastModelsQuery } = settingsApiSlice;

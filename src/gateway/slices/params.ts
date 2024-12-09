import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/pages/tools/types';
import { PrecipitationUnit, IfsDataParameter, AccumulationTime } from '@/client';

export interface Forecastparams {
    status?: LoadingStatus;
    mask_area?: string;
    color_style?: string;
    plot_units?: PrecipitationUnit;
    acc_time?: AccumulationTime;
    forecast_date?: string;
    forecast_time?: string;
}

export interface GanParams {
    model?: string;
    show_ensemble?: boolean;
    max_ens_plots?: number;
    threshold_chance?: number;
    histogram_plot?: string;
    histogram_bins?: number;
    histogram_certainity?: number;
    show_percentages?: boolean;
    location?: string;
    latitude?: number;
    longitude?: number;
}

export interface OpenIfsParams {
    vis_param?: IfsDataParameter;
    show_ensemble?: boolean;
    max_ens_plots?: number;
}

export interface ParamState extends Forecastparams {
    cgan: GanParams;
    open_ifs: OpenIfsParams;
}

const initialState: ParamState = {
    status: 'idle',
    cgan: {},
    open_ifs: {}
};

export const ParamSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        onForecastParamChange(state, action: PayloadAction<Forecastparams>) {
            state = {
                ...state,
                ...action.payload
            };
        },
        onGanParamChange(state, action: PayloadAction<GanParams>) {
            state.cgan = {
                ...state.cgan,
                ...action.payload
            };
        },
        onOpenIfsParamChange(state, action: PayloadAction<OpenIfsParams>) {
            state.open_ifs = {
                ...state.open_ifs,
                ...action.payload
            };
        }
    },
    selectors: {
        allParams: (paramState) => paramState,
        forecastParams: (paramState) => ({
            mask_area: paramState?.mask_area,
            color_style: paramState?.color_style,
            plot_units: paramState?.plot_units,
            forecast_date: paramState?.forecast_date
        }),
        openIfsParams: (paramState) => ({
            vis_param: paramState.open_ifs?.vis_param
        }),
        openEnsembleParams: (paramState) => ({
            show_ensemble: paramState.open_ifs?.show_ensemble,
            max_ens_plots: paramState.open_ifs?.max_ens_plots
        }),
        ganParams: (paramState) => ({
            model: paramState.cgan?.model,
            acc_time: paramState?.acc_time,
            forecast_date: paramState?.forecast_date,
            forecast_time: paramState?.forecast_time
        }),
        ganEnsembleParams: (paramState) => ({
            show_ensemble: paramState.cgan?.show_ensemble,
            max_ens_plots: paramState.cgan?.max_ens_plots
        }),
        ganHistogramParams: (paramState) => ({
            histogram_plot: paramState.cgan?.histogram_plot,
            histogram_bins: paramState.cgan?.histogram_bins,
            histogram_certainity: paramState.cgan?.histogram_certainity,
            location: paramState.cgan?.location,
            latitude: paramState.cgan?.latitude,
            longitude: paramState.cgan?.longitude
        }),
        ganThresholdChanceParams: (paramState) => ({
            threshold_chance: paramState.cgan?.threshold_chance,
            show_percentages: paramState.cgan?.show_percentages
        })
    }
});

export const { onForecastParamChange, onGanParamChange, onOpenIfsParamChange } = ParamSlice.actions;
export const { forecastParams, openIfsParams, openEnsembleParams, ganParams, ganHistogramParams, ganEnsembleParams, ganThresholdChanceParams } = ParamSlice.selectors;
export default ParamSlice.reducer;

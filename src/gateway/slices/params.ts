import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/pages/tools/types';
import { validObjectEntries } from '@/gateway/slices/tools';

export interface Forecastparams {
    status?: LoadingStatus;
    mask_area?: string;
    color_style?: string;
    plot_units?: string;
    acc_time?: string;
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
    vis_param?: string;
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
            return {
                ...state,
                ...action.payload
            };
        },
        onGanParamChange(state, action: PayloadAction<GanParams>) {
            return {
                ...state,
                cgan: {
                    ...state.cgan,
                    ...action.payload
                }
            };
        },
        onOpenIfsParamChange(state, action: PayloadAction<OpenIfsParams>) {
            return {
                ...state,
                open_ifs: {
                    ...state.open_ifs,
                    ...action.payload
                }
            };
        }
    },
    selectors: {
        selectForecastParams: (paramState) =>
            validObjectEntries({
                mask_area: paramState.mask_area,
                color_style: paramState.color_style,
                plot_units: paramState.plot_units,
                forecast_date: paramState.forecast_date
            }),
        selectOpenIfsParams: (paramState) =>
            validObjectEntries({
                vis_param: paramState.open_ifs?.vis_param
            }),
        selectOpenEnsembleParams: (paramState) =>
            validObjectEntries({
                show_ensemble: paramState.open_ifs?.show_ensemble,
                max_ens_plots: paramState.open_ifs?.max_ens_plots
            }),
        selectGanParams: (paramState) =>
            validObjectEntries({
                acc_time: paramState.acc_time,
                forecast_date: paramState.forecast_date,
                forecast_time: paramState.forecast_time
            }),
        selectGanEnsembleParams: (paramState) =>
            validObjectEntries({
                show_ensemble: paramState.cgan?.show_ensemble,
                max_ens_plots: paramState.cgan?.max_ens_plots
            }),
        selectGanHistogramParams: (paramState) =>
            validObjectEntries({
                histogram_plot: paramState.cgan?.histogram_plot,
                histogram_bins: paramState.cgan?.histogram_bins,
                histogram_certainity: paramState.cgan?.histogram_certainity,
                location: paramState.cgan?.location,
                latitude: paramState.cgan?.latitude,
                longitude: paramState.cgan?.longitude
            }),
        selectGanThresholdParams: (paramState) =>
            validObjectEntries({
                threshold_chance: paramState.cgan?.threshold_chance,
                show_percentages: paramState.cgan?.show_percentages
            })
    }
});

export const { onForecastParamChange, onGanParamChange, onOpenIfsParamChange } = ParamSlice.actions;
export const { selectForecastParams, selectOpenIfsParams, selectOpenEnsembleParams, selectGanParams, selectGanHistogramParams, selectGanEnsembleParams, selectGanThresholdParams } = ParamSlice.selectors;
export default ParamSlice.reducer;

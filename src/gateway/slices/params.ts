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
    start_time?: string;
    valid_time?: string;
}

export interface EnsembleParams {
    model?: string;
    show_ensemble?: boolean;
    max_ens_plots?: number;
    threshold?: number;
    certainity?: number;
    plot_type?: string;
    show_percentages?: boolean;
}

export interface CountParams {
    model?: string;
    histogram_plot?: string;
    histogram_bins?: number;
    histogram_certainity?: number;
    threshold?: number;
    show_percentages?: boolean;
}

export interface OpenIfsParams {
    vis_param?: string;
    show_ensemble?: boolean;
    max_ens_plots?: number;
}

interface IndexPageProps {
    activeIndex: number;
}

export interface ParamState extends Forecastparams {
    ensemble: EnsembleParams;
    count: CountParams,
    open_ifs: OpenIfsParams;
    pages: IndexPageProps;
}

const initialState: ParamState = {
    status: 'idle',
    ensemble: { threshold: 5 },
    count: {},
    open_ifs: {},
    pages: { activeIndex: 0 }
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
        onEnsembleParamChange(state, action: PayloadAction<EnsembleParams>) {
            return {
                ...state,
                ensemble: {
                    ...state.ensemble,
                    ...action.payload
                }
            };
        },
        onCountParamChange(state, action: PayloadAction<CountParams>) {
            return {
                ...state,
                count: {
                    ...state.count,
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
        },
        onActiveIndexPageChange(state, action: PayloadAction<number>) {
            state.pages.activeIndex = action.payload;
        }
    },
    selectors: {
        selectEnsembleParams: (paramState) =>
            validObjectEntries({
                model: paramState.ensemble.model,
                mask_area: paramState.mask_area,
                color_style: paramState.color_style,
                plot_units: paramState.plot_units,
                forecast_date: paramState.forecast_date
            }),
        selectCountParams: (paramState) =>
            validObjectEntries({
                model: paramState.count.model,
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
        selectEnsembleForecastParams: (paramState) =>
            validObjectEntries({
                acc_time: paramState.acc_time,
                forecast_date: paramState.forecast_date,
                start_time: paramState.start_time
            }),
        selectGanEnsembleParams: (paramState) =>
            validObjectEntries({
                show_ensemble: paramState.ensemble.show_ensemble,
                max_ens_plots: paramState.ensemble.max_ens_plots
            }),
        selectGanThresholdParams: (paramState) =>
            validObjectEntries({
                threshold: paramState.ensemble?.threshold,
                show_percentages: paramState.ensemble?.show_percentages
            })
    }
});

export const { onForecastParamChange, onEnsembleParamChange, onOpenIfsParamChange, onActiveIndexPageChange } = ParamSlice.actions;
export const { selectEnsembleParams, selectOpenIfsParams, selectOpenEnsembleParams, selectEnsembleForecastParams, selectGanEnsembleParams, selectGanThresholdParams } = ParamSlice.selectors;
export default ParamSlice.reducer;

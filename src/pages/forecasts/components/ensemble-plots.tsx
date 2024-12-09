import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange, onOpenIfsParamChange } from '@/gateway/slices/params';
import NumericInput from './form/numeric-input';

export default function MaxEnsemblePlots(props: { forecast: 'cgan' | 'open-ifs' }) {
    const dispatch = useAppDispatch();
    const max_ens_plots = useAppSelector((state) => (props.forecast === 'cgan' ? state.params.cgan.max_ens_plots : state.params.open_ifs.max_ens_plots));

    const onValueChange = (value: number) => {
        if (props.forecast === 'cgan') {
            dispatch(onGanParamChange({ max_ens_plots: value }));
        }
        if (props.forecast === 'open-ifs') {
            dispatch(onOpenIfsParamChange({ max_ens_plots: value }));
        }
    };

    return <NumericInput {...{ label: 'Ensemble Member Plots Shown', inputId: 'max-ens-plots', helpText: 'Specify number of ensemble plots to show', value: max_ens_plots || 5, onChange: onValueChange, max: 50, min: 5, suffix: ' plots' }} />;
}

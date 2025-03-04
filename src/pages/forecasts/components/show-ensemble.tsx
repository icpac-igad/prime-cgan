import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onEnsembleParamChange, onOpenIfsParamChange } from '@/gateway/slices/params';

export default function ShowEnsemble(props: { forecast: 'cgan' | 'open-ifs' }) {
    const dispatch = useAppDispatch();

    const show_ensemble = useAppSelector((state) => (props.forecast === 'cgan' ? state.params.ensemble?.show_ensemble : state.params.open_ifs?.show_ensemble));
    const options = ['Yes', 'No'];
    const option_selected = show_ensemble === null || show_ensemble === undefined || show_ensemble === true ? 'Yes' : 'No';

    const onValueChange = (value: string) => {
        const boolValue = value === 'Yes' ? true : false;
        if (props.forecast === 'cgan') {
            dispatch(onEnsembleParamChange({ show_ensemble: boolValue }));
        }
        if (props.forecast === 'open-ifs') {
            dispatch(onOpenIfsParamChange({ show_ensemble: boolValue }));
        }
    };

    return <ToggleButton {...{ label: 'Show Ensemble Members?', inputId: 'show-ensemble', helpText: 'Visualize ensemble member plots', options: options, value: option_selected, onChange: onValueChange }} />;
}

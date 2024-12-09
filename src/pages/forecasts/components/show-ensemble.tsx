import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onGanParamChange, onOpenIfsParamChange } from '@/gateway/slices/params';

export default function ShowEnsemble(props: { forecast: 'cgan' | 'open-ifs' }) {
    const dispatch = useAppDispatch();

    const show_ensemble = useAppSelector((state) => (props.forecast === 'cgan' ? state.params.cgan?.show_ensemble : state.params.open_ifs?.show_ensemble));
    const options = ['Yes', 'No'];

    const onValueChange = (value: string) => {
        const boolValue = value === 'Yes' ? true : false;
        if (props.forecast === 'cgan') {
            dispatch(onGanParamChange({ show_ensemble: boolValue }));
        }
        if (props.forecast === 'open-ifs') {
            dispatch(onOpenIfsParamChange({ show_ensemble: boolValue }));
        }
    };

    return <ToggleButton {...{ label: 'Show Ensemble Members?', inputId: 'show-ensemble', helpText: 'Visualize ensemble member plots', options: options, value: show_ensemble ? options[0] : options[1], onChange: onValueChange }} />;
}

import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import ToggleButton from './form/toggle-button';
import { onEnsembleParamChange, onOpenIfsParamChange } from '@/gateway/slices/params';
import { GanForecastModel } from '@/pages/tools/types';

export default function ShowEnsemble() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector((state) => state.params.pages.activeIndex);
    const model = useAppSelector((state) => activePage === 2 ? 'open-ifs' : state.params?.model) as GanForecastModel;

    const show_ensemble = useAppSelector((state) => activePage === 2 ? state.params?.open_ifs?.show_ensemble : activePage === 1 ? state.params?.ensemble?.show_ensemble : false);
    const options = ['Yes', 'No'];
    const option_selected = show_ensemble === null || show_ensemble === undefined || show_ensemble === false ? 'No' : 'Yes';

    const onValueChange = (value: string) => {
        const boolValue = value === 'Yes' ? true : false;
        if (model?.includes("ens")) {
            dispatch(onEnsembleParamChange({ show_ensemble: boolValue }));
        }
        if (model === 'open-ifs') {
            dispatch(onOpenIfsParamChange({ show_ensemble: boolValue }));
        }
    };

    return <ToggleButton {...{ label: 'Show Ensemble Members?', inputId: 'show-ensemble', helpText: 'Visualize ensemble member plots', options: options, value: option_selected, onChange: onValueChange }} />;
}

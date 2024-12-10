import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onOpenIfsParamChange } from '@/gateway/slices/params';
import { IfsDataParameter } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function VisualizationParamater() {
    const dispatch = useAppDispatch();
    const vis_param = useAppSelector((state) => state.params.open_ifs?.vis_param);

    const onValueChange = (value: string) => {
        dispatch(onOpenIfsParamChange({ vis_param: value }));
    };

    const options: SelectOption[] = [
        { label: IfsDataParameter.TOTAL_PRECIPITATION, value: IfsDataParameter.TOTAL_PRECIPITATION },
        { label: IfsDataParameter.SURFACE_RUNOFF_WATER, value: IfsDataParameter.SURFACE_RUNOFF_WATER },
        { label: IfsDataParameter.SURFACE_PRESSURE, value: IfsDataParameter.SURFACE_PRESSURE },
        { label: IfsDataParameter.PRESSURE_AT_MEAN_SEA_LEVEL, value: IfsDataParameter.PRESSURE_AT_MEAN_SEA_LEVEL },
        { label: IfsDataParameter.TWO_METRE_TEMPERATURE, value: IfsDataParameter.TWO_METRE_TEMPERATURE },
        { label: IfsDataParameter.WIND_SPEED, value: IfsDataParameter.WIND_SPEED }
    ];
    return <SelectInput {...{ inputId: 'visualization-param', label: 'Visualization Parameter', helpText: 'select forecast parameter to be visualized', options: options, value: vis_param || options[0].value, onChange: onValueChange }} />;
}

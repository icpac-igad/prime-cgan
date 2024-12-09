import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onOpenIfsParamChange } from '@/gateway/slices/params';
import { IfsDataParameter } from '@/client';
import { SelectOption } from '@/pages/tools/types';
import SelectInput from './form/select-input';

export default function VisualizationParamater() {
    const dispatch = useAppDispatch();
    const vis_param = useAppSelector((state) => state.params.open_ifs?.vis_param);

    const onValueChange = (value: string) => {
        if (
            value === 'TOTAL_PRECIPITATION' ||
            value === 'SURFACE_RUNOFF_WATER' ||
            value === 'SURFACE_PRESSURE' ||
            value === 'PRESSURE_AT_MEAN_SEA_LEVEL' ||
            value === 'PRESSURE_AT_MEAN_SEA_LEVEL' ||
            value === 'TWO_METRE_TEMPERATURE' ||
            value === 'WIND_SPEED'
        ) {
            dispatch(onOpenIfsParamChange({ vis_param: IfsDataParameter[value] }));
        }
    };

    const options: SelectOption[] = [
        { label: IfsDataParameter.TOTAL_PRECIPITATION, value: 'TOTAL_PRECIPITATION' },
        { label: IfsDataParameter.SURFACE_RUNOFF_WATER, value: 'SURFACE_RUNOFF_WATER' },
        { label: IfsDataParameter.SURFACE_PRESSURE, value: 'SURFACE_PRESSURE' },
        { label: IfsDataParameter.PRESSURE_AT_MEAN_SEA_LEVEL, value: 'PRESSURE_AT_MEAN_SEA_LEVEL' },
        { label: IfsDataParameter.TWO_METRE_TEMPERATURE, value: 'TWO_METRE_TEMPERATURE' },
        { label: IfsDataParameter.WIND_SPEED, value: 'WIND_SPEED' }
    ];
    return <SelectInput {...{ inputId: 'visualization-param', label: 'Visualization Parameter', helpText: 'select forecast parameter to be visualized', options: options, value: vis_param || options[0].value, onChange: onValueChange }} />;
}

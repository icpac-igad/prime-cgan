import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { useFetchMaskAreasQuery } from '@/gateway/slices/settings';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash';

import { GanModels } from '@/pages/tools/constants';
import { setRegionSelect } from '@/pages/tools/plotsLib';

export default function SelectAreaOfInterest() {
    const dispatch = useAppDispatch();
    const mask_area = useAppSelector((state) => state.params?.mask_area);
    const model = useAppSelector((state) => state.params.cgan?.model) || GanModels[0].value;

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ mask_area: value }));
        if (GanModels.map((m) => m.value).includes(model)) {
            setRegionSelect(value);
        }
    };

    const { data = [], isFetching, isSuccess, isLoading } = useFetchMaskAreasQuery({ url: '/settings/mask-areas' });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        const options = data.map((item) => ({ label: item.name, value: item.name }));
        return <SelectInput {...{ inputId: 'select-aoi', label: 'Area of Interest', helpText: 'select area or region of analysis', options: options, value: mask_area || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

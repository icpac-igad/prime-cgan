import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { useFetchMaskAreasQuery } from '@/gateway/slices/settings';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash-es';

import { setRegionSelect } from '@/pages/tools/plotsLib';
import { useEffect } from 'react';

export default function SelectAreaOfInterest() {
    const dispatch = useAppDispatch();
    const mask_area = useAppSelector((state) => state.params?.mask_area);
    const model = useAppSelector((state) => state.params.model);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ mask_area: value }));
        if (model?.includes('count')) {
            setRegionSelect(value);
        }
    };

    const { data = [], isFetching, isSuccess, isLoading } = useFetchMaskAreasQuery({ url: '/settings/mask-areas' });
    useEffect(() => {
        if(!isEmpty(data) && isEmpty(mask_area)) {
            dispatch(onForecastParamChange({ mask_area: data[0].name }));
        }
    }, [data, mask_area])

    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        const options = data.map((item) => ({ label: item.name, value: item.name }));
        return <SelectInput {...{ inputId: 'select-aoi', label: 'Area of Interest', helpText: 'select area or region of analysis', options: options, value: mask_area || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

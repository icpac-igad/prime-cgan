import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import CascadeSelect from './form/cascade-select';
import data from '@/assets/ea-major-towns-reorganized.json';

export default function LocationSelector() {
    const dispatch = useAppDispatch();
    const mask_area = useAppSelector((state) => state.params.mask_area);
    const location = useAppSelector((state) => state.params.cgan?.location);

    const locations = !mask_area || mask_area === 'East Africa' ? data : data.filter((item) => item.name === mask_area);

    const onValueChange = (value: string) => {
        dispatch(onGanParamChange({ location: value }));
    };

    return <CascadeSelect {...{ label: 'Histogram Location', helpText: 'Select location for histogram plots', inputId: 'hist-location', value: location ? location : '', data: locations, onChange: onValueChange }} />;
}

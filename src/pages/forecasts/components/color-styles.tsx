import { Message } from 'primereact/message';
import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { useFetchColorStylesQuery } from '@/gateway/slices/settings';
import { onForecastParamChange } from '@/gateway/slices/params';
import SelectInput from './form/select-input';
import Spinner from './spinner';
import { isEmpty } from 'lodash';

import { setStyleSelect } from '@/pages/tools/plotsLib';

export default function SelectColorStyle() {
    const dispatch = useAppDispatch();
    const color_style = useAppSelector((state) => state.params?.color_style);

    const onValueChange = (value: string) => {
        dispatch(onForecastParamChange({ color_style: value }));
        setStyleSelect(value);
    };

    const { data = [], isFetching, isSuccess, isLoading } = useFetchColorStylesQuery({ url: '/settings/color-styles' });
    if (isFetching || isLoading) {
        return <Spinner />;
    } else if (isSuccess && !isEmpty(data)) {
        const options = data.map((item) => ({ label: item.name, value: item.name }));
        return <SelectInput {...{ inputId: 'select-color-style', label: 'Visualization Color Style', helpText: 'select color style for ploting maps', options: options, value: color_style || options[0].value, onChange: onValueChange }} />;
    } else {
        return <Message severity="error" text="Error Loading Component" />;
    }
}

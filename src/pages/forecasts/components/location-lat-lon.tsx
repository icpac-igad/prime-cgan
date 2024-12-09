import { useAppDispatch, useAppSelector } from '@/gateway/hooks';
import { onGanParamChange } from '@/gateway/slices/params';
import NumericInput from './form/numeric-input';

export default function LatitudeLongitude(props: { target: 'latitude' | 'longitude' }) {
    const dispatch = useAppDispatch();
    const targetValue = useAppSelector((state) => (props.target === 'latitude' ? state.params.cgan?.latitude : state.params.cgan?.longitude));

    const onValueChange = (value: number) => {
        if (props.target === 'latitude') {
            dispatch(onGanParamChange({ latitude: value }));
        } else {
            dispatch(onGanParamChange({ longitude: value }));
        }
    };

    return (
        <NumericInput
            {...{
                label: `Location ${props.target}  in degrees ${props.target === 'latitude' ? 'north' : 'east'}`,
                inputId: props.target,
                helpText: `If specified together with ${props.target === 'latitude' ? 'longitude' : 'latitue'}, dropdown location will be ignored`,
                value: targetValue,
                onChange: onValueChange
            }}
        />
    );
}

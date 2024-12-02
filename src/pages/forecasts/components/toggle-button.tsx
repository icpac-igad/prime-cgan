import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputFieldProps } from '@/pages/tools/types';

export default function ToggleButton(props: InputFieldProps) {
    const options: string[] = ['Off', 'On'];

    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <SelectButton id={props.inputId} onChange={(e: SelectButtonChangeEvent) => props.onChange({ id: props.inputId, value: e.value })} options={options} aria-describedby={`${props.inputId}-help`} />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

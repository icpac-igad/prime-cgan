import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { ToggleButtonProps } from '@/pages/tools/types';

export default function ToggleButton(props: ToggleButtonProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <SelectButton id={props.inputId} name={props.inputId} onChange={(e: SelectButtonChangeEvent) => props.onChange(e.target.value)} value={props.value} options={props.options} aria-describedby={`${props.inputId}-help`} />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

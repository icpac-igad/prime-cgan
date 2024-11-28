import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputFieldProps } from '../../tools/types';

export default function NumericInput(props: InputFieldProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <InputNumber locale="en-US" onValueChange={(e: InputNumberValueChangeEvent) => props.onChange({ id: props.inputId, value: e.value })} id={props.inputId} className="p-inputtext-sm" aria-describedby={`${props.inputId}-help`} />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

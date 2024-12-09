import { InputText } from 'primereact/inputtext';
import { InputFieldProps } from '@/pages/tools/types';

export default function LabeledTextInput(props: InputFieldProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <InputText name={props.inputId} id={props.inputId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} value={props.value} className="p-inputtext-sm" aria-describedby={`${props.inputId}-help`} />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

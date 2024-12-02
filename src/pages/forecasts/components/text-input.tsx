import { InputText } from 'primereact/inputtext';
import { InputFieldProps } from '@/pages/tools/types';

export default function LabeledTextInput(props: InputFieldProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <InputText id={props.inputId} className="p-inputtext-sm" aria-describedby={`${props.inputId}-help`} />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

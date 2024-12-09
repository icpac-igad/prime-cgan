import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { NumberInputProps } from '@/pages/tools/types';

export default function NumericInput(props: NumberInputProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <InputNumber
                id={props.inputId}
                name={props.inputId}
                locale="en-US"
                onValueChange={(e: InputNumberValueChangeEvent) => props.onChange(e?.value || 0)}
                value={props.value}
                min={props?.min}
                max={props?.max}
                prefix={props?.prefix}
                suffix={props?.suffix}
                className="p-inputtext-sm"
                aria-describedby={`${props.inputId}-help`}
                maxFractionDigits={12}
            />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

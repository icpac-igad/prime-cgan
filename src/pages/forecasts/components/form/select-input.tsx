import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { SelectInputProps } from '@/pages/tools/types';

export default function SelectInput(props: SelectInputProps) {
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <Dropdown
                name={props.inputId}
                id={props.inputId}
                onChange={(e: DropdownChangeEvent) => props.onChange(e.target.value)}
                value={props.value}
                options={props.options}
                showClear
                placeholder={props?.placeholder || props.label}
                className="w-full md:w-14rem"
            />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

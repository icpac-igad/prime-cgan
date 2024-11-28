import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { SelectItem } from 'primereact/selectitem';
import { InputFieldProps } from '../../tools/types';

export default function SelectInput(props: InputFieldProps) {
    const options: SelectItem[] = [
        { label: 'Jurre Bristi', value: 'jurre-bristi' },
        { label: 'Mvua Kubwa', value: 'mvua-kibwa' }
    ];

    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <Dropdown onChange={(e: DropdownChangeEvent) => props.onChange({ id: props.inputId, value: e.value })} options={options} showClear placeholder={props?.placeholder || props.label} className="w-full md:w-14rem" />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

import { CascadeSelect, CascadeSelectChangeEvent } from 'primereact/cascadeselect';
import { CascadeInputProps } from '@/pages/tools/types';
import '@/assets/flags.scss';

export default function CascadeSelectInput(props: CascadeInputProps) {
    const cascadeOptionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center gap-2">
                {option?.level1 && <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${option.code.slice(0, 2).toLowerCase()}`} style={{ width: '18px' }} />}
                {option?.level2 && <i className="pi pi-compass" />}
                {option?.level3 && <i className="pi pi-asterisk" />}
                {!option?.level1 && !option?.level2 && !option?.level3 && <i className="pi pi-map-marker" />}
                <span>{option.name}</span>
            </div>
        );
    };
    return (
        <div className="flex flex-column gap-1">
            <label htmlFor={props.inputId}>{props.label}</label>
            <CascadeSelect
                onChange={(e: CascadeSelectChangeEvent) => props.onChange({ id: props.inputId, value: e.value })}
                options={props.data}
                optionLabel="name"
                optionGroupLabel="code"
                optionGroupChildren={['level1', 'level2', 'level3']}
                className="w-full md:w-14rem"
                breakpoint="767px"
                placeholder={props.placeholder || props.label}
                itemTemplate={cascadeOptionTemplate}
                style={{ minWidth: '12rem' }}
            />
            <small id={`${props.inputId}-help`}>{props.helpText}</small>
        </div>
    );
}

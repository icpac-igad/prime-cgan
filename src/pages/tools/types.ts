import { ReactNode, MutableRefObject } from 'react';

interface PublicProduct {
    title: string;
    text: string;
    icon: string;
}
export interface NavigationItem {
    name: string;
    url: string;
    target?: string;
}

export interface ForecastProduct extends PublicProduct {
    url: string;
}

export interface ResourceItem extends ForecastProduct {
    bg_color: string;
}

export interface TimelineItem extends PublicProduct {
    color: string;
    image: string;
    start_date: string;
    final_date: string;
}

export interface FooterItem extends NavigationItem {
    logo: string;
    width: number;
}

export interface HttpError {
    statusText?: string;
    message?: string;
}

export interface InputValue {
    id: string;
    value?: number | string | boolean | null;
}

export type OnValueChangeFunc = (value: string) => void;
export type onNumberChangeFunc = (value: number) => void;
export type onButtonClickFunc = () => void;

export interface BaseInputProps {
    label: string;
    placeholder?: string | null;
    inputId: string;
    helpText: string;
}

export interface InputFieldProps extends BaseInputProps {
    value: string;
    onChange: OnValueChangeFunc;
}

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectInputProps extends InputFieldProps {
    options: SelectOption[];
}

export interface ToggleButtonProps extends InputFieldProps {
    options: string[];
    disabled?: boolean;
}

export interface NumberInputProps extends BaseInputProps {
    prefix?: string | undefined;
    suffix?: string | undefined;
    max?: number | undefined;
    min?: number | undefined;
    value: number | undefined;
    onChange: onNumberChangeFunc;
}

export interface CascadeOption {
    name: string;
    code: string;
}

export interface CascadeLevel2 extends CascadeOption {
    level3?: CascadeOption[] | null;
}

export interface CascadeLevel1 extends CascadeOption {
    level2?: CascadeLevel2[] | null;
}

export interface CascadeLevel0 extends CascadeOption {
    level1?: CascadeLevel1[] | null;
}

export type LoadingStatus = 'loading' | 'failed' | 'loaded' | 'idle';

export interface CascadeOptions extends CascadeLevel0, CascadeLevel1, CascadeLevel2, CascadeOption {}

export interface CascadeInputProps extends InputFieldProps {
    data: CascadeOptions[];
}

export interface SubmitButtonProps {
    onClick: onButtonClickFunc;
    label: string;
    severity: 'info' | 'success' | 'warning' | 'danger' | 'help' | 'secondary';
    iconPos?: 'left' | 'right' | 'top' | 'bottom';
    icon?: string;
    rounded?: boolean;
    outline?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

export type NodeRef = MutableRefObject<ReactNode>;

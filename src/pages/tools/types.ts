import { ReactNode, MutableRefObject } from 'react';

interface PublicProduct {
    title: string;
    text: string;
    icon: string;
}
export interface NavigationItem {
    name: string;
    url: string;
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

export type OnValueChangeFunc = (value: InputValue) => void;

export interface InputFieldProps {
    label: string;
    placeholder?: string | null;
    inputId: string;
    helpText: string;
    onChange: OnValueChangeFunc;
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

export type NodeRef = MutableRefObject<ReactNode>;

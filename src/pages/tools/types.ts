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

export type NodeRef = MutableRefObject<ReactNode>;

import { ReactNode, MutableRefObject } from 'react';

export interface NavigationItem {
    name: string;
    url: string;
}

export interface ForecastProduct {
    title: string;
    text: string;
    icon: string;
}

export interface ResourceItem extends ForecastProduct {
    bg_color: string;
    link: string;
}

export interface TimelineItem extends ForecastProduct {
    color: string;
    image: string;
    start_date: string;
    final_date: string;
}

export interface FooterItem extends NavigationItem {
    logo: string;
    width: number;
}

export type NodeRef = MutableRefObject<ReactNode>;

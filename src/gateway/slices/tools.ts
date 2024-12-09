import { isEmpty } from 'lodash';
interface LooseObject {
    [key: string | number]: any;
}

export const validObjectEntries = (items: LooseObject) => {
    let validKeys: string[] = [];
    const excludeKeys: string[] = ['show_ensemble', 'show_percentages'];
    Object.entries(items).forEach(([key, value]) => {
        if (!isEmpty(value) && !excludeKeys.includes(key)) {
            validKeys.push(key);
        }
    });
    let newItems: LooseObject = {};
    for (let i = 0; i <= validKeys.length; i++) {
        newItems[validKeys[i]] = items[validKeys[i]];
    }
    return newItems;
};

export const urlEncodedParams = (params: LooseObject) => {
    let search_params: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
            search_params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    });
    console.log('urlEncodedParams', search_params.join('&'));
    return search_params.join('&');
};

export const urlEncodeParams = (params: LooseObject) => {
    const search_params = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
            search_params.append(key, value);
        }
    });
    console.info('urlEncodeParams', search_params);
    return search_params;
};

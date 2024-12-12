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

    if (isEmpty(validKeys)) return {};

    const validItems: LooseObject = {};
    for (const key of validKeys) {
        validItems[key] = items[key];
    }
    return validItems;
};

export const urlEncodeParams = (params: LooseObject) => {
    const search_params = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
            search_params.append(key, value);
        }
    });
    return search_params;
};

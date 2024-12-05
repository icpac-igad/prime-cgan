interface LooseObject {
    [key: string | number]: any;
}

export const urlEncodeParams = (params: LooseObject) =>
    Object.keys(params)
        .map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        })
        .join('&');

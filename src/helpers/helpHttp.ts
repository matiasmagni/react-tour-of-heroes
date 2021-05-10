
export const helpHttp = () => {

    const customFetch = (endpoint: string, options: any) => {
        const defaultHeaders = {
            accept: 'application/json',
        }

        // Objeto AbortController para controlar caidas de servidor
        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";
        options.headers = options.headers ?
            { ...defaultHeaders, ...options.headers } : defaultHeaders;

        // Si no se recibe un body por peticiones get
        options.body = JSON.stringify(options.body) || false;

        // Elimina la propiedad de body
        if (!options.body) delete options.body;

        // setTimeout(() => controller.abort, 3000);
        return fetch(endpoint, options)
            .then(res => res.ok ? res.json() : Promise.reject({
                err: true,
                status: res.status || '00',
                statusText: res.statusText || 'Ocurrio un error'
            }))
            .catch(err => err);
    };

    const get = (url: string, options: any = {}) => customFetch(url, options);

    const post = (url: string, options: any = {}) => {
        options.method = 'POST';
        return customFetch(url, options);
    };

    const put = (url: string, options: any = {}) => {
        options.method = 'PUT';
        return customFetch(url, options);
    };

    const del = (url: string, options: any = {}) => {
        options.method = 'DELETE';
        return customFetch(url, options);
    };

    return {
        get, post, put, del
    }

    // const getHero = async (id: string) => {
    //     const url = `http://localhost:3000/hero?id=${id}`;
    //     const resp = await fetch(url);
    //     const { data } = await resp.json();

    //     return data;
    // }

    // const getAllHeroes = async () => {
    //     const url = 'http://localhost:3000/hero';
    //     const resp = await fetch(url);
    //     const { data } = await resp.json();

    //     return data;
    // }


}


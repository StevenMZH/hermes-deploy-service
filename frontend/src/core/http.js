import axios from "axios";

export class ApiClient {
  constructor(baseURL, config = {}) {
    this.ax = axios.create({ baseURL, ...config });
    // Aquí puedes agregar interceptores (auth, logging, retries)
    // this.ax.interceptors.request.use(cfg => cfg);
    // this.ax.interceptors.response.use(res => res, err => Promise.reject(err));
  }
    async call(endpoint, { pathParams, data, config } = {}) {
    const { method, path, requestMapper, responseMapper } = endpoint;

    const url = typeof path === "function" ? path(pathParams || {}) : path;

    // ✨ Si hay un requestMapper, úsalo; sino, intenta usar toJSON si existe
    let payload;
    if (requestMapper) {
        payload = requestMapper(data);
    } else if (data?.toJSON) {
        payload = data.toJSON();
    } else {
        payload = data;
    }

    const res = await this.ax.request({
        method,
        url,
        ...(method === "GET" ? { params: payload } : { data: payload }),
        ...(config || {}),
    });

    return responseMapper ? responseMapper(res.data) : res.data;
    }

}

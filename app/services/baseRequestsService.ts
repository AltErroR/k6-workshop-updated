import http, { Params, RequestBody } from "k6/http"
import { BASE_URL } from "../../config/k6Config.ts"
import { createRequestName, processResponse } from "../utils.ts";


export class BaseRequestsService {

    private readonly defaultParams: Params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    constructor(private readonly baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl
    }

    protected get(path: string, params?: Params) {
        const namedParams = createRequestName(params, undefined, 'GET [BaseRequestsService - name not set]')
        const resp = http.get(`${this.baseUrl}${path}`, this.withDefaultHeaders(namedParams))
        processResponse(resp, namedParams)
        return resp
    }

    protected post(path: string, body: RequestBody | null, params?: Params) {
        const namedParams = createRequestName(params, undefined, 'POST [BaseRequestsService - name not set]')
        const resp = http.post(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(namedParams))
        processResponse(resp, namedParams)
        return resp
    }

    protected put(path: string, body: RequestBody | null, params?: Params) {
        const namedParams = createRequestName(params, undefined, 'PUT [BaseRequestsService - name not set]')
        const resp = http.put(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(namedParams))
        processResponse(resp, namedParams)
        return resp
    }

    protected delete(path: string, body: RequestBody | null, params?: Params) {
        const namedParams = createRequestName(params, undefined, 'DELETE [BaseRequestsService - name not set]')
        const resp = http.del(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(namedParams))
        processResponse(resp, namedParams)
        return resp
    }

    private withDefaultHeaders(params?: Params): Params {
        return {
            ...this.defaultParams,
            ...params,
            headers: {
                ...this.defaultParams.headers,
                ...params?.headers
            }
        };
    }

}

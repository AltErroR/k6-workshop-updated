import http, { Params, RequestBody } from "k6/http"
import { BASE_URL } from "../../config/k6Config.ts"
import { processResponse } from "../utils.ts";


export class BaseRequestsService {

    private readonly defaultParams: Params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    constructor(private readonly baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl
    }

    protected get(path: string, params?: Params & Record<string, any>) {
        const finalParams = this.withDefaultHeaders(params, 'GET [BaseRequestsService - name not set]')
        const resp = http.get(`${this.baseUrl}${path}`, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected post(path: string, body: RequestBody | null, params?: Params & Record<string, any>) {
        const finalParams = this.withDefaultHeaders(params, 'POST [BaseRequestsService - name not set]')
        const resp = http.post(`${this.baseUrl}${path}`, body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected put(path: string, body: RequestBody | null, params?: Params & Record<string, any>) {
        const finalParams = this.withDefaultHeaders(params, 'PUT [BaseRequestsService - name not set]')
        const resp = http.put(`${this.baseUrl}${path}`, body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected delete(path: string, body: RequestBody | null, params?: Params & Record<string, any>) {
        const finalParams = this.withDefaultHeaders(params, 'DELETE [BaseRequestsService - name not set]')
        const resp = http.del(`${this.baseUrl}${path}`, body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    private withDefaultHeaders(params?: Params & Record<string, any>, fallbackName?: string): Params {
        const resolvedName = params?.requestName ?? params?.tags?.name ?? fallbackName
        const { requestName, ...rest } = params || {}
        return {
            ...this.defaultParams,
            ...rest,
            headers: { ...this.defaultParams.headers, ...rest?.headers },
            tags: { ...rest?.tags, name: resolvedName }
        }
    }

}

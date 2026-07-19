import http, { Params, RequestBody } from "k6/http"
import { BASE_URL } from "../../config/k6Config.ts"
import { utilitiesManager } from "../utilitiesManager.ts";


export class BaseRequestsService {

    private readonly defaultParams: Params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    constructor(private readonly baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl
    }

    protected get(path: string, params?: Params, expectedStatus: number | number[] = 200) {
        const resp = http.get(`${this.baseUrl}${path}`, this.withDefaultHeaders(params))
        utilitiesManager.log(resp, expectedStatus)
        return resp
    }

    protected post(path: string, body: RequestBody | null, params?: Params) {
        const resp = http.post(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))
        utilitiesManager.log(resp, 200)
        return resp
    }

    protected put(path: string, body: RequestBody | null, params?: Params) {
        const resp = http.put(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))
        utilitiesManager.log(resp, 200)
        return resp
    }

    protected delete(path: string, body: RequestBody | null, params?: Params) {
        const resp = http.del(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))
        utilitiesManager.log(resp, 200)
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

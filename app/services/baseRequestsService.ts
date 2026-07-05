import http, { Params, RequestBody } from "k6/http"
import { BASE_URL } from "../../config/k6Config.ts"


export class BaseRequestsService {

    private readonly defaultParams: Params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //for path parametrization. 
    // 1. Init of baseUrl field
    // 2. By default baseUrl = BASE_URL
    // 3. Instance get val of baseUrl
    constructor(private readonly baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl
    }

    protected get(path: string, params?: Params) {
        return http.get(`${this.baseUrl}${path}`, this.withDefaultHeaders(params))

    }

    protected post(path: string, body: RequestBody | null, params?: Params) {
        return http.post(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))

    }

    protected put(path: string, body: RequestBody | null, params?: Params) {
        return http.put(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))
    }

    protected delete(path: string, body: RequestBody | null, params?: Params) {
        return http.del(`${this.baseUrl}${path}`, body, this.withDefaultHeaders(params))
    }

    private withDefaultHeaders(params?: Params): Params {
        return {
            ...this.defaultParams,
            ...params,
            headers: {
                ...this.defaultParams.headers,
                ...params?.headers  // User headers override defaults
            }
        };
    }

}

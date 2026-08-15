import http, { RequestBody } from "k6/http"
import { processResponse, buildUrl, resolveRequestParams } from "../utils.ts";
import { ExtendedParams, EnvironmentConfig } from "../types.ts";
import { currentEnv } from "../../config/k6Config.ts";

export class BaseRequestsService {

    constructor(protected readonly env: EnvironmentConfig = currentEnv) {}

    protected get(path: string, params?: ExtendedParams) {
        const finalParams = resolveRequestParams(this.env.defaultParams, params, 'GET', path)
        const resp = http.get(buildUrl(this.env.baseUrl, path, params?.queryParams), finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected post(path: string, body: RequestBody | null, params?: ExtendedParams) {
        const finalParams = resolveRequestParams(this.env.defaultParams, params, 'POST', path)
        const resp = http.post(buildUrl(this.env.baseUrl, path, params?.queryParams), body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected put(path: string, body: RequestBody | null, params?: ExtendedParams) {
        const finalParams = resolveRequestParams(this.env.defaultParams, params, 'PUT', path)
        const resp = http.put(buildUrl(this.env.baseUrl, path, params?.queryParams), body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }

    protected delete(path: string, body: RequestBody | null, params?: ExtendedParams) {
        const finalParams = resolveRequestParams(this.env.defaultParams, params, 'DELETE', path)
        const resp = http.del(buildUrl(this.env.baseUrl, path, params?.queryParams), body, finalParams)
        processResponse(resp, finalParams)
        return resp
    }
}

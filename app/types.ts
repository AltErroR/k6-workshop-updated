import { Params } from "k6/http"

export interface EnvironmentConfig {
    baseUrl: string
    defaultParams: ExtendedParams
    secrets: Record<string, string>
}

export interface ExtendedParams extends Params {
    requestName?: string
    enabledStatusCheck?: boolean
    enabledBodyCheck?: boolean
    queryParams?: Record<string, string | number | boolean>
}

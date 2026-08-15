import { RefinedResponse } from "k6/http";
import { check } from "k6";
import { ExtendedParams } from "./types.ts";
import { ENV_NAME, LOAD_NAME } from "../config/k6Config.ts";

const defaultRequestTags: Record<string, string> = { env: ENV_NAME, load: LOAD_NAME }

export function validateStatus(resp: RefinedResponse<"text" | "binary" | "none">, params?: ExtendedParams): void {
  if (params?.enabledStatusCheck === false) return;
  const name = params?.tags?.name ?? params?.requestName;
  check(resp, {
    [`${name}: status is 200 - 399, got ${resp.status}`]: (r) => r.status >= 200 && r.status < 399
  });
}

export function validateResponseBody(resp: RefinedResponse<"text" | "binary" | "none">, params?: ExtendedParams): void {
  if (params?.enabledBodyCheck === false) return;
  const name = params?.tags?.name ?? params?.requestName;
  check(resp, {
    [`${name}: body is not empty`]: (r) => !!r.body && typeof r.body === 'string'
  });
}

export function processResponse(resp: RefinedResponse<"text" | "binary" | "none">, params?: ExtendedParams): void {
  validateStatus(resp, params);
  validateResponseBody(resp, params);
}

export function resolveRequestParams(defaultParams: ExtendedParams, params: ExtendedParams | undefined, method: string, path: string): ExtendedParams {
  const resolvedName = params?.requestName ?? params?.tags?.name ?? `${method} ${path}`
  const { requestName, queryParams, ...rest } = params || {}
  return {
    ...defaultParams,
    ...rest,
    headers: { ...defaultParams.headers, ...rest?.headers },
    tags: { ...defaultRequestTags, ...defaultParams.tags, ...rest?.tags, name: resolvedName }
  }
}

export function buildUrl(baseUrl: string, path: string, queryParams?: Record<string, string | number | boolean>): string {
  if (!queryParams || Object.keys(queryParams).length === 0) return `${baseUrl}${path}`
  const query = Object.entries(queryParams)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
  return `${baseUrl}${path}?${query}`
}

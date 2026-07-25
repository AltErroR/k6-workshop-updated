import { Params, RefinedResponse } from "k6/http";
import { check } from "k6";

export function createRequestName(params?: Params & Record<string, any>, name?: string, fallbackName?: string): Params {
  const p = params as any;
  const resolvedName = name ?? p?.requestName ?? p?.tags?.name ?? fallbackName;
  const { requestName, ...rest } = p || {};

  return {
    ...rest,
    tags: { ...rest?.tags, name: resolvedName }
  };
}

export function validateStatus(resp: RefinedResponse<"text" | "binary" | "none">, params?: Params): void {
  if ((params as any)?.enabledStatusCheck === false) return;

  const p = params as any;
  const name = p?.tags?.name ?? p?.requestName;

  check(resp, {
    [`${name}: status is 200 - 399, got ${resp.status}`]: (r) => r.status >= 200 && r.status < 399
  });
}

export function validateResponseBody(resp: RefinedResponse<"text" | "binary" | "none">, params?: Params): void {
  if ((params as any)?.enabledBodyCheck === false) return;

  const p = params as any;
  const name = p?.tags?.name ?? p?.requestName;

  check(resp, {
    [`${name}: body is not empty`]: (r) => !!r.body && typeof r.body === 'string'
  });
}

export function processResponse(resp: RefinedResponse<"text" | "binary" | "none">, params?: Params): void {
  validateStatus(resp, params);
  validateResponseBody(resp, params);
}

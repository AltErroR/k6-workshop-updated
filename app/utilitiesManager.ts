import { RefinedResponse } from "k6/http";
import { check } from "k6";
import { BASE_URL } from "../config/k6Config.ts";

class UtilitiesManager {

  private readonly staticKeywords = ['v2', 'user', 'pet', 'store', 'order', 'category', 'findByStatus'];

  private normalizePath(url: string): string {
    const path = url.replace(BASE_URL, '').split('?')[0];

    return path.split('/').map(segment => {
      if (!segment || this.staticKeywords.includes(segment.toLowerCase())) {
        return segment;
      }
      return '{param}';
    }).join('/');
  }

  private createCheckName(resp: RefinedResponse<"text" | "binary" | "none">, expectedStatuses: number[]): string {
    const method = resp.request?.method || 'REQUEST';
    const url = resp.request?.url || '';
    const path = this.normalizePath(url);

    return `${method} ${path}: status is one of [${expectedStatuses.join(', ')}]`;
  }

  private validateStatus(resp: RefinedResponse<"text" | "binary" | "none">, expectedStatuses: number[]): void {
    const checkName = this.createCheckName(resp, expectedStatuses);

    const isSuccess = check(resp, {
      [checkName]: (r) => expectedStatuses.includes(r.status)
    });

    if (!isSuccess) {
      throw new Error(`Failed to get expected status. Expected:[${expectedStatuses.join(', ')}], actual:${resp.status}, response body: ${resp.body}`);
    }
  }

  private validateResponseBody(resp: RefinedResponse<"text" | "binary" | "none">): void {
    if (resp.status >= 200 && resp.status < 300) {
      if (!resp.body || typeof resp.body !== 'string') {
        throw new Error('Response body is empty or not a string');
      }
    }
  }

  log(resp: RefinedResponse<"text" | "binary" | "none">, status: number | number[]): void {
    const expectedStatuses = Array.isArray(status) ? status : [status];

    this.validateStatus(resp, expectedStatuses);
    this.validateResponseBody(resp);
  }

}

export const utilitiesManager = new UtilitiesManager();

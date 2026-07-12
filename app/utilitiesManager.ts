import { RefinedResponse } from "k6/http";
import { check } from "k6";

class UtilitiesManager {


  log(resp: RefinedResponse<"text" | "binary" | "none">, status: number | number[]): void {
    const expectedStatuses = Array.isArray(status) ? status : [status];
    const isSuccess = check(resp, {
      [`status is one of [${expectedStatuses.join(', ')}]`]: (r) => expectedStatuses.includes(r.status)
    });

    if (!isSuccess) {
      throw new Error(`Failed to get expected status. Expected:[${expectedStatuses.join(', ')}], actual:${resp.status}, response body: ${resp.body}`);
    }

    if (resp.status >= 200 && resp.status < 300) {
      if (!resp.body || typeof resp.body !== 'string') {
        throw new Error('Response body is empty or not a string');
      }
    }

  }

}

export const utilitiesManager = new UtilitiesManager();

import { RefinedResponse } from "k6/http";
import { check } from "k6";

class UtilitiesManager {


  log(resp: RefinedResponse<"text" | "binary"| "none">, status: number): void {
    const isSuccess = check(resp, { 'status equals 200': (r) => r.status === status });

    if (!isSuccess) {
      throw new Error(`Failed to get expected status. Expected:${status}, actual:${resp.status}, response body: ${resp.body}`);
    }

    if (!resp.body || typeof resp.body !== 'string') {
        throw new Error('Response body is empty or not a string');
      }

  }

  randomString(length: number): string {
    return `Pet_${Math.random().toString(36).substring(2, 2 + length)}`
  }

  randomNumber(max:number):string{
    return (Math.floor(Math.random() * max) +1).toString()
  }

}

export const utilitiesManager = new UtilitiesManager();

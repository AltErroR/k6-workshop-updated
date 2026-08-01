import { RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { ExtendedParams } from "../types.ts";


export class StoreService extends BaseRequestsService {

    getOrder(id: string, params?: ExtendedParams) {
        return this.get(`/v2/store/order/${id}`, { requestName: 'GET /v2/store/order/{id}', ...params })
    }

    placeOrder(body: RequestBody, params?: ExtendedParams) {
        return this.post(`/v2/store/order`, body, params)
    }

    deleteOrder(id: string, params?: ExtendedParams) {
        return this.delete(`/v2/store/order/${id}`, null, { requestName: 'DELETE /v2/store/order/{id}', ...params })
    }

}

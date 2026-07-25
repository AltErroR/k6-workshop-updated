import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { createRequestName } from "../utils.ts";


export class StoreService extends BaseRequestsService {

    getOrder(id: string, params?: Params) {
        return this.get(`/v2/store/order/${id}`, createRequestName(params, 'GET /v2/store/order/{id}'))
    }

    placeOrder(body: RequestBody, params?: Params) {
        return this.post(`/v2/store/order`, body, createRequestName(params, 'POST /v2/store/order'))
    }

    deleteOrder(id: string, params?: Params) {
        return this.delete(`/v2/store/order/${id}`, null, createRequestName(params, 'DELETE /v2/store/order/{id}'))
    }

}

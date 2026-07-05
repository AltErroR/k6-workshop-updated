import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";


export class StoreService extends BaseRequestsService{

getOrder(id:string){
    return this.get(`/v2/store/order/${id}`,)
}

placeOrder(body:RequestBody,params?:Params){
    return this.post(`/v2/store/order`,body,params)
}

deleteOrder(id:string,params?:Params){
    return this.delete(`/v2/store/order/${id}`, null,params)
}

}
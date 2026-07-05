import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { API_KEY } from "../../config/k6Config.ts"



export class PetService extends BaseRequestsService{

    findPetByStatus(status:"available"|"sold"|"pending", params?:Params){
        return this.get(`/v2/pet/findByStatus?status=${status}`,params)
    }

    findPetById(id:string, params?:Params){
        return this.get(`/v2/pet/${id}`,params)
    }

    //updates existing pet or creates new - misleading info in swagger
    addOrUpdatePet(body:RequestBody,params?:Params){
        return this.put(`/v2/pet`,body,params)
    }

    updatePetStatus(id:string, name:string, status:"available"|"sold"|"pending",params?:Params){
        const formParams: Params = {
            ...params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...params?.headers
            }
        };
        return this.post(`/v2/pet/${id}`,`name=${name}&status=${status}`,formParams)
    }

    deletePet(id:string,params?:Params){
        return this.delete(`/v2/pet/${id}`, null, this.addApiKeyHeader(params))
    }

    private addApiKeyHeader(params?: Params): Params {
        return {
            ...params,
            headers: {
                ...params?.headers,
                'api_key': API_KEY
            }
        }
    }
}
import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { API_KEY } from "../../config/k6Config.ts"
import { createRequestName } from "../utils.ts";



export class PetService extends BaseRequestsService {

    findPetByStatus(status: "available" | "sold" | "pending", params?: Params) {
        return this.get(`/v2/pet/findByStatus?status=${status}`, createRequestName(params, 'GET /v2/pet/findByStatus'))
    }

    findPetById(id: string, params?: Params) {
        return this.get(`/v2/pet/${id}`, createRequestName(params, 'GET /v2/pet/{id}'))
    }

    addPet(body: RequestBody, params?: Params) {
        return this.post(`/v2/pet`, body, createRequestName(params, 'POST /v2/pet'))
    }

    updatePet(body: RequestBody, params?: Params) {
        return this.put(`/v2/pet`, body, createRequestName(params, 'PUT /v2/pet'))
    }

    updatePetStatus(id: string, name: string, status: "available" | "sold" | "pending", params?: Params) {
        const namedParams = createRequestName(params, 'POST /v2/pet/{id}');
        return this.post(`/v2/pet/${id}`, `name=${name}&status=${status}`, {
            ...namedParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...namedParams.headers
            }
        })
    }

    deletePet(id: string, params?: Params) {
        const namedParams = createRequestName(params, 'DELETE /v2/pet/{id}');
        return this.delete(`/v2/pet/${id}`, null, {
            ...namedParams,
            headers: {
                ...namedParams.headers,
                'api_key': API_KEY
            }
        })
    }
}

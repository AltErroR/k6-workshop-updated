import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { API_KEY } from "../../config/k6Config.ts"


export class PetService extends BaseRequestsService {

    findPetByStatus(status: "available" | "sold" | "pending", params?: Params) {
        return this.get(`/v2/pet/findByStatus?status=${status}`, { ...params, requestName: 'GET /v2/pet/findByStatus' })
    }

    findPetById(id: string, params?: Params) {
        return this.get(`/v2/pet/${id}`, { ...params, requestName: 'GET /v2/pet/{id}' })
    }

    addPet(body: RequestBody, params?: Params) {
        return this.post(`/v2/pet`, body, { ...params, requestName: 'POST /v2/pet' })
    }

    updatePet(body: RequestBody, params?: Params) {
        return this.put(`/v2/pet`, body, { ...params, requestName: 'PUT /v2/pet' })
    }

    updatePetStatus(id: string, name: string, status: "available" | "sold" | "pending", params?: Params) {
        return this.post(`/v2/pet/${id}`, `name=${name}&status=${status}`, {
            ...params,
            requestName: 'POST /v2/pet/{id}',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...params?.headers
            }
        })
    }

    deletePet(id: string, params?: Params) {
        return this.delete(`/v2/pet/${id}`, null, {
            ...params,
            requestName: 'DELETE /v2/pet/{id}',
            headers: {
                ...params?.headers,
                'api_key': API_KEY
            }
        })
    }
}

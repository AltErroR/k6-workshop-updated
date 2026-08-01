import { RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { ExtendedParams } from "../types.ts";


export class PetService extends BaseRequestsService {

    findPetByStatus(status: "available" | "sold" | "pending", params?: ExtendedParams) {
        return this.get(`/v2/pet/findByStatus`, {
            requestName: 'GET /v2/pet/findByStatus',
            ...params,
            queryParams: { ...params?.queryParams, status }
        })
    }

    findPetById(id: string, params?: ExtendedParams) {
        return this.get(`/v2/pet/${id}`, { requestName: 'GET /v2/pet/{id}', ...params })
    }

    addPet(body: RequestBody, params?: ExtendedParams) {
        return this.post(`/v2/pet`, body, params)
    }

    updatePet(body: RequestBody, params?: ExtendedParams) {
        return this.put(`/v2/pet`, body, params)
    }

    updatePetStatus(id: string, name: string, status: "available" | "sold" | "pending", params?: ExtendedParams) {
        return this.post(`/v2/pet/${id}`, `name=${name}&status=${status}`, {
            requestName: 'POST /v2/pet/{id}',
            ...params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...params?.headers
            }
        })
    }

    deletePet(id: string, params?: ExtendedParams) {
        return this.delete(`/v2/pet/${id}`, null, {
            requestName: 'DELETE /v2/pet/{id}',
            ...params,
            headers: {
                ...params?.headers,
                'api_key': this.env.secrets.apiKey
            }
        })
    }
}

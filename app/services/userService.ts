import { RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { ExtendedParams } from "../types.ts";


export class UserService extends BaseRequestsService {

    addUser(body: RequestBody, params?: ExtendedParams) {
        return this.post(`/v2/user`, body, params)
    }

    deleteUser(username: string, params?: ExtendedParams) {
        return this.delete(`/v2/user/${username}`, null, { requestName: 'DELETE /v2/user/{username}', ...params })
    }

    getUserByUsername(username: string, params?: ExtendedParams) {
        return this.get(`/v2/user/${username}`, { requestName: 'GET /v2/user/{username}', ...params })
    }

    updateUser(username: string, body: RequestBody, params?: ExtendedParams) {
        return this.put(`/v2/user/${username}`, body, { requestName: 'PUT /v2/user/{username}', ...params })
    }

}

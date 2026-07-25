import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";
import { createRequestName } from "../utils.ts";



export class UserService extends BaseRequestsService {

    addUser(body: RequestBody, params?: Params) {
        return this.post(`/v2/user`, body, createRequestName({ ...params, requestName: 'POST /v2/user' }))
    }

    deleteUser(username: string, params?: Params) {
        return this.delete(`/v2/user/${username}`, null, createRequestName({ ...params, tags: { ...(params as any)?.tags, name: 'DELETE /v2/user/{username}' } }))
    }

    getUserByUsername(username: string, params?: Params) {
        return this.get(`/v2/user/${username}`, createRequestName(params, 'GET /v2/user/{username}'))
    }

    updateUser(username: string, body: RequestBody, params?: Params) {
        return this.put(`/v2/user/${username}`, body, createRequestName(params, 'PUT /v2/user/{username}'))
    }

}

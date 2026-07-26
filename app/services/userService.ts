import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";


export class UserService extends BaseRequestsService {

    addUser(body: RequestBody, params?: Params) {
        return this.post(`/v2/user`, body, { ...params, requestName: 'POST /v2/user' })
    }

    deleteUser(username: string, params?: Params) {
        return this.delete(`/v2/user/${username}`, null, { ...params, tags: { ...params?.tags, name: 'DELETE /v2/user/{username}' } })
    }

    getUserByUsername(username: string, params?: Params) {
        return this.get(`/v2/user/${username}`, { ...params, requestName: 'GET /v2/user/{username}' })
    }

    updateUser(username: string, body: RequestBody, params?: Params) {
        return this.put(`/v2/user/${username}`, body, { ...params, requestName: 'PUT /v2/user/{username}' })
    }

}

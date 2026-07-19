import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";



export class UserService extends BaseRequestsService {

    addUser(body: RequestBody, params?: Params) {
        return this.post(`/v2/user`, body, params)
    }

    deleteUser(username: string, params?: Params) {
        return this.delete(`/v2/user/${username}`, null, params)
    }

    getUserByUsername(username: string, params?: Params, expectedStatus: number | number[] = 200) {
        return this.get(`/v2/user/${username}`, params, expectedStatus)
    }

    updateUser(username: string, body: RequestBody, params?: Params) {
        return this.put(`/v2/user/${username}`, body, params)
    }

}
import { Params, RequestBody } from "k6/http";
import { BaseRequestsService } from "./baseRequestsService.ts";



export class UserService extends BaseRequestsService {

    addUser(body: RequestBody, params?: Params) {
        return this.post(`/v2/user`, body, params)
    }

    deleteUser(username: string) {
        return this.delete(`/v2/user/${username}`, null,)
    }

    getUserByUsername(username: string) {
        return this.get(`/v2/user/${username}`)
    }

    updateUser(username:string,body:RequestBody,params?:Params){
        return this.put(`/v2/user/${username}`,body,params)
    }

}
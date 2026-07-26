import { group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";


export class GetUserByUsername {

    execute<T extends object>(username: string , stepData: T = {} as T){
        return group('Get user by username group', function () {
            const resp = requestsManager.userService.getUserByUsername(username);
            const user: User = JSON.parse(resp.body as string)
            return { ...stepData, username, foundUser: user }
        });
    }
}

import { group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";


export class GetUserByUsername {

    execute<T extends { username: string }>(stepData: T): T & { foundUser: User } {
        return group('GetUserByUsername group', function () {
            const username = stepData.username
            const resp = requestsManager.userService.getUserByUsername(username);
            const user: User = JSON.parse(resp.body as string)
            return { ...(stepData || {}), username, foundUser: user }
        });
    }
}

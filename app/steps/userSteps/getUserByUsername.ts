import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
import { utilitiesManager } from "../../utilitiesManager.ts";


export class GetUserByUsername {

      execute(): { username: string, foundUser: User };
      execute<T extends { username: string }>(stepData: T): T & { foundUser: User };
    
      execute<T extends { username: string }>(stepData?: T): any {
        return group('GetUserByUsername group', function () {
            const username = stepData?.username ?? utilitiesManager.randomString(10);
            const resp = requestsManager.userService.getUserByUsername(username);
            utilitiesManager.log(resp,200)

            const user: User = JSON.parse(resp.body as string)
            return { ...(stepData || {}), username, foundUser:user}
        });
    }
}
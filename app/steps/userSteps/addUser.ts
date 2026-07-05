import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
import { entitiesManager } from "../../entitiesManager.ts";
import { utilitiesManager } from "../../utilitiesManager.ts";

export class AddUser {
    execute(): { username: string };
    execute<T extends { username: string }>(stepData: T): T;

    execute<T extends { username: string }>(stepData?: T): any {
        const username = stepData?.username ?? utilitiesManager.randomString(10);
        const userData: Partial<User> = {
            username: username
        }
        return group('AddUser group', function () {
            const userToAdd: User = entitiesManager.createUser(userData);
            const resp = requestsManager.userService.addUser(
                JSON.stringify(userToAdd)
            );
            utilitiesManager.log(resp, 200)
            return { ...(stepData || {}), username };
        });
    }
}
import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
import { entitiesManager } from "../../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"


export class AddUser {

    execute<T extends { username: string }>(stepData: T): T & { addedUser: User } {
        const username = stepData?.username ?? randomString(10,);
        const userData: Partial<User> = {
            username: username
        }
        return group('AddUser group', function () {
            const userToAdd: User = entitiesManager.createUser(userData);
            const resp = requestsManager.userService.addUser(
                JSON.stringify(userToAdd)
            );

            const verifyResp = requestsManager.userService.getUserByUsername(username);
            const foundUser: User = JSON.parse(verifyResp.body as string);

            check(foundUser, {
                'AddUser: user created with correct username': (u) => u.username === username,
            });

            return { ...(stepData || {}), username, addedUser: userToAdd };
        });
    }
}
import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
import { entitiesManager } from "../../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"


export class AddUser {

    execute<T extends { username?: string }>(stepData?: T): T & { username: string; addedUser: User }
    execute<T extends { username?: string }>(username: string, stepData?: T): T & { username: string; addedUser: User }
    execute<T extends { username?: string }>(usernameOrData?: string | T, incomingData: T = {} as T) {
        const username: string = typeof usernameOrData === 'string'
            ? usernameOrData
            : (usernameOrData as T)?.username ?? randomString(10)
        const stepData: T = (typeof usernameOrData === 'string' ? incomingData : usernameOrData ?? {} as T) as T
        const userData: Partial<User> = { username }
        return group('Add user group', function () {
            const userToAdd: User = entitiesManager.createUser(userData);
            requestsManager.userService.addUser(JSON.stringify(userToAdd));

            const verifyResp = requestsManager.userService.getUserByUsername(username);
            const foundUser: User = JSON.parse(verifyResp.body as string);

            check(foundUser, {
                'AddUser: user created with correct username': (u) => u.username === String(username),
            });

            return { ...stepData, username, addedUser: userToAdd };
        });
    }
}
import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"


export class UpdateUserByUsername {
    execute<T extends object>(username: string, stepData: T, foundUserForUpdate: User, updates?: Partial<User>) {
        const defaultUpdates: Partial<User> = {
            username: username,
            firstName: randomString(5),
            lastName: randomString(9),
            email: randomString(5) + randomString(2, '0123456789') + "@gmail.com"
        }

        return group('UpdateUser group', function () {
            const updatedUser: User = {
                ...foundUserForUpdate,
                ...defaultUpdates,
                ...updates
            };
            const resp = requestsManager.userService.updateUser(
                username,
                JSON.stringify(updatedUser));

            const responseBody = JSON.parse(resp.body as string);

            check(responseBody, {
                'UpdateUser: response message matches user ID': (r) => r.message && r.message === updatedUser.id.toString(),
            });

            return { ...stepData, updatedUser }
        });
    }
}
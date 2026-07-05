import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";
import { utilitiesManager } from "../../utilitiesManager.ts";

export class UpdateUser {
    execute<T extends { username: string, foundUser: User }>(stepData: T): T & { updatedUser: User } {
        const updates: Partial<User> = {
            username: stepData.username,
            firstName: utilitiesManager.randomString(5),
            lastName: utilitiesManager.randomString(9),
            email: utilitiesManager.randomString(5) + utilitiesManager.randomNumber(10) + "@gmail.com"
        }

        return group('UpdateUser group', function () {
            const userToUpdate: User = {
                ...stepData.foundUser,
                ...updates
            };
            const resp: any = requestsManager.userService.updateUser(
                stepData.username,
                JSON.stringify(userToUpdate));
            utilitiesManager.log(resp, 200)
            return { ...stepData, updatedUser: userToUpdate }
        });
    }
}
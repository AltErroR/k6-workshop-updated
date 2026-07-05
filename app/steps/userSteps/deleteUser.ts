import { group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { utilitiesManager } from "../../utilitiesManager.ts";
import { User } from "../../entities/user.ts";


export class DeleteUser {

    execute<T extends { foundUser: User }>(stepData: T): Omit<T, 'foundUser'> {
        return group('DeleteUser group', function () {
            const resp = requestsManager.userService.deleteUser(stepData.foundUser.username);
            utilitiesManager.log(resp, 200)
            const { foundUser, ...rest } = stepData as any;
            return rest as Omit<T, 'foundUser'>;
        });
    }
}
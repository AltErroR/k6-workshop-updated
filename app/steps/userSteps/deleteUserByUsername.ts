import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../entities/user.ts";


export class DeleteUserByUsername {

    execute<T extends object>(username: string, stepData: T) {
        return group('Delete user group', function () {

            const resp = requestsManager.userService.deleteUser(username);

            if (resp.status === 200) {
                const deleteResponse = JSON.parse(resp.body as string);
                check(deleteResponse, {
                    'DeleteUser: response contains username': (r) => r.message === username,
                });
            }

            const { foundUser, ...rest } = stepData as T & { foundUser?: User };
            return rest as Omit<T, 'foundUser'>;
        });
    }
}
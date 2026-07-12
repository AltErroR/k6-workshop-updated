import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";


export class DeleteUserByUsername {

    execute<T extends { username: string }>(stepData: T, expectedStatus: number | number[] = 200): Omit<T, 'foundUser'> {
        return group('DeleteUser group', function () {

            const resp = requestsManager.userService.deleteUser(stepData.username, undefined, expectedStatus);

            if (resp.status === 200) {
                // approach similar to other steps files with getEntityBySmth
                // does not work, swagger does not remove users,even after removal getByUsername still returns 200 status
                // pauses does not help, so I decided to check the content of response on username
                const deleteResponse = JSON.parse(resp.body as string);
                check(deleteResponse, {
                    'DeleteUser: response contains username': (r) => r.message === stepData.username,
                });
            }

            const { foundUser, ...rest } = stepData as T & { foundUser?: import('../../entities/user.ts').User };
            return rest as Omit<T, 'foundUser'>;
        });
    }
}
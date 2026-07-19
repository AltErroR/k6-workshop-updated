import { group, check } from "k6";
import { requestsManager } from "../../requestsManager.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"



export class SetupUser {

    execute<T extends { username?: string }>(usernameToUse?: string, stepData: T = {} as T) {
        return group('SetupUser group', function () {

            const username = usernameToUse ?? stepData?.username ?? randomString(10)
            const getResp = requestsManager.userService.getUserByUsername(username, undefined, [200, 404])

            if (getResp.status === 200) {

                const delResp = requestsManager.userService.deleteUser(username)

                if (delResp.status === 200) {

                    const deleteResponse = JSON.parse(delResp.body as string);
                    check(deleteResponse, {
                        'SetupUser: response contains username': (r) => r.message === String(username),
                    })
                }
            }
            return { ...stepData, username }
        });

    }
}
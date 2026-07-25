import { group } from "k6";
//@ts-ignore
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import { requestsManager } from "../../requestsManager.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"



export class SetupUser {

    execute<T extends { username?: string }>(usernameToUse?: string, stepData: T = {} as T) {
        return group('SetupUser group', function () {

            const username = usernameToUse ?? stepData?.username ?? randomString(10)
            const getResp = requestsManager.userService.getUserByUsername(username, { enabledStatusCheck: false, enabledBodyCheck: false } as any)

            if (getResp.status === 200) {

                const delResp = requestsManager.userService.deleteUser(username)
                expect(delResp.status).toBe(200)
            }
            return { ...stepData, username }
        });

    }
}
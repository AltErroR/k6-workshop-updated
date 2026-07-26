import { group } from "k6";
//@ts-ignore
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
import { requestsManager } from "../../requestsManager.ts";
//@ts-ignore
import { randomString } from "../../../framework/k6Libs/k6Libs.js"



export class SetupUser {

    execute<T extends { username?: string }>(stepData?: T): T & { username: string }
    execute<T extends { username?: string }>(username: string, stepData?: T): T & { username: string }
    execute<T extends { username?: string }>(usernameOrData?: string | T, incomingData: T = {} as T) {
        return group('Setup user group', function () {
            const username: string = typeof usernameOrData === 'string'
                ? usernameOrData
                : (usernameOrData as T)?.username ?? randomString(10)
            const stepData: T = (typeof usernameOrData === 'string' ? incomingData : usernameOrData ?? {} as T) as T
            const getResp = requestsManager.userService.getUserByUsername(username, { enabledStatusCheck: false, enabledBodyCheck: false } as any)

            if (getResp.status === 200) {
                const delResp = requestsManager.userService.deleteUser(username, { enabledStatusCheck: false, enabledBodyCheck: false } as any)
                expect(delResp.status).toBe(200)
            }
            return { ...stepData, username }
        });
    }
}
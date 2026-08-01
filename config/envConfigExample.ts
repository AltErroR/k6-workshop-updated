// example of git ignored file

import { EnvironmentConfig } from "../app/types.ts"

export const dev: EnvironmentConfig = {
    baseUrl: '',
    defaultParams: {},
    secrets: {}
}

export const stage = {}
export const prod = {}
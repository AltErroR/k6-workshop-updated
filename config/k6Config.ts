import { envConfigs } from "./envConfigs.ts"
import { loadConfigs, LoadConfig } from "./loadConfigs.ts"
import { EnvironmentConfig } from "../app/types.ts"
import { resolveConfig } from "./configResolver.ts"

// @ts-ignore
export const ENV_NAME: string = __ENV.ENV ?? 'stage'
// @ts-ignore
export const LOAD_NAME: string = __ENV.LOAD ?? 'smoke'

export const currentEnv: EnvironmentConfig = resolveConfig(envConfigs, ENV_NAME, 'ENV')
export const currentLoad: LoadConfig = resolveConfig(loadConfigs, LOAD_NAME, 'LOAD')

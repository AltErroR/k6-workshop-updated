export function resolveConfig<T>(configs: Record<string, T>, name: string, type: string): T {
    const config = configs[name]
    if (!config) throw new Error(`Unknown ${type}: "${name}". Valid: ${Object.keys(configs).join(', ')}`)
    return config
}

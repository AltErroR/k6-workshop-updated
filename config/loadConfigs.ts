export interface LoadConfig {
    vus: number
    duration: string
    iterations: number
    thresholds: Record<string, string[]>
}

export const loadConfigs: Record<string, LoadConfig> = {
    smoke: {
        vus: 1,
        duration: '30s',
        iterations: 1,
        thresholds: {}
    },

    load: {
        vus: 10,
        duration: '30s',
        iterations: 350,
        thresholds: {
            http_req_duration: ['p(95)<500'],
            http_req_failed: ['rate<0.01']
        }
    },

    capacity: {
        vus: 100,
        duration: '10m',
        iterations: 2500,
        thresholds: {
            http_req_duration: ['p(99)<2000'],
            http_req_failed: ['rate<0.05']
        }
    },

    stress: {
        vus: 100,
        duration: '10m',
        iterations: 5000,
        thresholds: {
            http_req_duration: ['p(99)<1000'],
            http_req_failed: ['rate<0.02']
        }
    },

    soak: {
        vus: 5,
        duration: '2h',
        iterations: 10000,
        thresholds: {
            http_req_duration: ['p(95)<500'],
            http_req_failed: ['rate<0.01']
        }
    }
}

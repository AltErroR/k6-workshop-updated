import petScenario from "../scenarios/petScenario.ts";
import storeScenario from "../scenarios/storeScenario.ts";
import userScenario from "../scenarios/userScenario.ts";
import { currentLoad } from "../../config/k6Config.ts";

export { handleSummary } from "../../framework/k6Summary.ts"

export const options = {
  thresholds: currentLoad.thresholds,
  scenarios: {
    petScenario: {
      executor: 'constant-vus',
      exec: 'runPetScenario',
      vus: currentLoad.vus,
      duration: currentLoad.duration,
      startTime: '0s',
    },
    storeScenario: {
      executor: 'constant-vus',
      exec: 'runStoreScenario',
      vus: currentLoad.vus,
      duration: currentLoad.duration,
      startTime: '0s',
    },
    userScenario: {
      executor: 'shared-iterations',
      exec: 'runUserScenario',
      vus: currentLoad.vus,
      iterations: currentLoad.iterations,
      startTime: '0s',
    },
  },
};

export function runPetScenario() {
  petScenario();
}

export function runStoreScenario() {
  storeScenario();
}

export function runUserScenario() {
  userScenario();
}

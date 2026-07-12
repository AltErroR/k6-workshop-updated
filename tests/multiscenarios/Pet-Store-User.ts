import petScenario, { setup as petSetup } from "../scenarios/petScenario.ts";
import storeScenario, { setup as storeSetup } from "../scenarios/storeScenario.ts";
import userScenario, { setup as userSetup } from "../scenarios/userScenario.ts";

export { handleSummary } from "../../framework/k6Summary.ts"

export const options = {
  scenarios: {
    petScenario: {
      executor: 'constant-vus',
      exec: 'runPetScenario',
      vus: 1,
      duration: '30s',
      startTime: '0s',
    },
    storeScenario: {
      executor: 'constant-vus',
      exec: 'runStoreScenario',
      vus: 1,
      duration: '30s',
      startTime: '0s',
    },
    userScenario: {
      executor: 'shared-iterations',
      exec: 'runUserScenario',
      vus: 1,
      iterations: 25,
      startTime: '0s',
    },
  },
};

export function runPetScenario() {
  const setupData = petSetup();
  petScenario(setupData);
}

export function runStoreScenario() {
  const setupData = storeSetup();
  storeScenario(setupData);
}

export function runUserScenario() {
  const setupData = userSetup();
  userScenario(setupData);
}

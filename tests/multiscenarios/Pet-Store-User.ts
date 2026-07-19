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

export function setup() {
  const setupData1 = petSetup()
  const setupData2 = storeSetup()
  const setupData3 = userSetup()
  return {setupData1, setupData2,setupData3}
}

export function runPetScenario(setupData: { setupData1: { petId: string } }) {
  petScenario(setupData.setupData1);
}

export function runStoreScenario(setupData: { setupData2: { testOrderId: string } }) {
  storeScenario(setupData.setupData2);
}

export function runUserScenario(setupData: { setupData3: { username: string } }) {
  userScenario(setupData.setupData3);
}

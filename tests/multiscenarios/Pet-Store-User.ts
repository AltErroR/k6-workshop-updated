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
  const setupPetData = petSetup()
  const setupStoreData = storeSetup()
  const setupUserData = userSetup()
  return {setupPetData, setupUserData,setupStoreData}
}

export function runPetScenario(setupData: { setupPetData: { petId: string } }) {
  petScenario(setupData.setupPetData);
}

export function runStoreScenario(setupData: { setupStoreData: { testOrderId: string } }) {
  storeScenario(setupData.setupStoreData);
}

export function runUserScenario(setupData: { setupUserData: { username: string } }) {
  userScenario(setupData.setupUserData);
}

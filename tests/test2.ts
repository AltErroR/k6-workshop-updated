import petScenario from "./scenarios/petScenario.ts";
import storeScenario from "./scenarios/storeScenario.ts";
import userScenario from "./scenarios/userScenario.ts";

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
  console.log("=== Running Pet Scenario ===");
  petScenario();
}

export function runStoreScenario() {
  console.log("=== Running Store Scenario ===");
  storeScenario();
}

export function runUserScenario() {
  console.log("=== Running User Scenario ===");
  userScenario();
}


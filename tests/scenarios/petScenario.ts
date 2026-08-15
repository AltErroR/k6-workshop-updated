import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

// setup() is for one-time global preparation before all VUs start (e.g. auth tokens, shared config).
// Per-VU data is handled inside default() to avoid shared state between VUs.
// export function setup() { return stepsManager.petSteps.setupPet() }

export default function () {
  const setupData = stepsManager.petSteps.setupPet()
  const addedPetData = stepsManager.petSteps.addPet(setupData.petId, setupData)
  const foundPetData = stepsManager.petSteps.findPetById(addedPetData.petId, addedPetData)
  const updatedPetData = stepsManager.petSteps.updatePetByData(foundPetData.petId, foundPetData);
  const petWithStatusData = stepsManager.petSteps.updatePetStatus(updatedPetData, "sold")
  const verifiedStatusData = stepsManager.petSteps.findPetById(petWithStatusData.petId, petWithStatusData)
  const deletedPetData = stepsManager.petSteps.deletePetById(verifiedStatusData.petId, verifiedStatusData)
}

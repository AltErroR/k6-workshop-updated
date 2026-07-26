import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.petSteps.setupPet()
}


export default function (setupData: { petId: string }) {
  const addedPetData = stepsManager.petSteps.addPet(setupData.petId, setupData)
  const foundPetData = stepsManager.petSteps.findPetById(addedPetData.petId, addedPetData)
  const updatedPetData = stepsManager.petSteps.updatePetByData(foundPetData.foundPet, foundPetData);
  const petWithStatusData = stepsManager.petSteps.updatePetStatus(updatedPetData, "sold")
  const deletedPetData = stepsManager.petSteps.deletePetById(petWithStatusData.petId, petWithStatusData)
}

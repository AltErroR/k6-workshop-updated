import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.petSteps.setupPet()
}


export default function (setupData: { petId: string }) {
  const stepData1 = stepsManager.petSteps.addPet(setupData.petId, setupData)
  const stepData2 = stepsManager.petSteps.findPetById(stepData1.petId, stepData1)
  const stepData3 = stepsManager.petSteps.updateFoundPet(stepData2.foundPet,stepData2);
  const stepData4 = stepsManager.petSteps.updateFoundPetStatus(stepData3, "sold")
  const stepData5 = stepsManager.petSteps.deletePetById(stepData4.petId,stepData4)

}

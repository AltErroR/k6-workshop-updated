import { stepsManager } from "../../app/stepsManager.ts"
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  const setupData1 = { petId: randomString(8, '0123456789') }
  const setupData2 = stepsManager.petSteps.deleteFoundPet(setupData1, setupData1.petId, [200, 404])
  return setupData2
}


export default function (setupData: { petId: string }) {
  const stepData1 = stepsManager.petSteps.addPetWithId(setupData.petId, setupData)
  const stepData2 = stepsManager.petSteps.findPetById(stepData1, stepData1.petId)
  const stepData3 = stepsManager.petSteps.updateFoundPet(stepData2);
  const stepData4 = stepsManager.petSteps.updateFoundPetStatus(stepData3, "sold")
  const stepData5 = stepsManager.petSteps.deleteFoundPet(stepData4, stepData4.petId)

}

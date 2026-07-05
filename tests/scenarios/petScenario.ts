import { stepsManager } from "../../app/stepsManager.ts"


export default function () {
  let stepData;

  try {
    stepData = stepsManager.petSteps.getAvailablePet()
    stepsManager.petSteps.deleteAvailablePet(stepData)
  } catch {
    console.log("Available pet not found (expected)");
  }

  stepData = stepData ? stepsManager.petSteps.addAvailablePet(stepData) : stepsManager.petSteps.addAvailablePet();
  stepData = stepsManager.petSteps.findAvailablePetById(stepData)
  stepData = stepsManager.petSteps.updateFoundPet(stepData);
  stepData = stepsManager.petSteps.updateFoundPetStatus(stepData, "sold")
  stepsManager.petSteps.deleteFoundPet(stepData)

  try {
    stepsManager.petSteps.findFoundPetById(stepData);
  } catch (error) {
    console.log("After deletion: Pet not found (expected)");
  }
}

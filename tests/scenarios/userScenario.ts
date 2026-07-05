import { stepsManager } from "../../app/stepsManager.ts"


export default function () {
  let stepData;

  try {
    stepData = stepsManager.getUserByUsername.execute();
    stepsManager.deleteUser.execute(stepData);
  } catch {
    console.log("User not found (expected)");
  }

  stepData = stepData ? stepsManager.addUser.execute(stepData) : stepsManager.addUser.execute();
  stepData = stepsManager.getUserByUsername.execute(stepData);
  stepData = stepsManager.updateUser.execute(stepData);
  stepData = stepsManager.getUserByUsername.execute(stepData);
  stepsManager.deleteUser.execute(stepData);

  try {
    stepsManager.getUserByUsername.execute(stepData);
  } catch (error) {
    console.log("After deletion: User not found (expected)");
  }
}

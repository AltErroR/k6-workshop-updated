import { stepsManager } from "../../app/stepsManager.ts"


export default function () {
  let stepData;

  try {
    stepData = stepsManager.storeSteps.getOrder();
    stepData = stepsManager.storeSteps.deleteOrder(stepData);
  } catch {
    console.log("Order not found (expected)");
  }

  stepData = stepData ? stepsManager.storeSteps.placeOrder(stepData) : stepsManager.storeSteps.placeOrder();
  stepData = stepsManager.storeSteps.getOrder(stepData);
  stepData = stepsManager.storeSteps.deleteOrder(stepData);

  try {
    stepsManager.storeSteps.getOrder(stepData);
  } catch (error) {
    console.log("After deletion: Order not found (expected)");
  }
}

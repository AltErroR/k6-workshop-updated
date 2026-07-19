import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.storeSteps.setupOrder()
}

export default function (setupData: { testOrderId: string }) {


  const stepData1 = stepsManager.storeSteps.placeOrderById(setupData.testOrderId)
  const stepData2 = stepsManager.storeSteps.getOrderById(stepData1.testOrderId,stepData1);
  const stepData3 = stepsManager.storeSteps.deleteOrderById(stepData2.foundOrder.id, stepData2);

}

import { stepsManager } from "../../app/stepsManager.ts"
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  const setupData1 = { testOrderId:randomString(1, '123456789')}
  const setupData2 = stepsManager.storeSteps.deleteOrderById(setupData1, setupData1.testOrderId, [200, 404]);
  return setupData2
}

export default function (setupData: { testOrderId: string }) {


  const stepData1 = stepsManager.storeSteps.placeOrder(setupData)
  const stepData2 = stepsManager.storeSteps.getOrder(stepData1);
  const stepData3 = stepsManager.storeSteps.deleteOrderById(stepData2,stepData2.foundOrder.id);

}

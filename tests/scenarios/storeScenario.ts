import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.storeSteps.setupOrder()
}

export default function (setupData: { testOrderId: string }) {

  const placedOrderData = stepsManager.storeSteps.placeOrderById(setupData.testOrderId)
  const foundOrderData = stepsManager.storeSteps.getOrderById(placedOrderData.testOrderId, placedOrderData);
  const deletedOrderData = stepsManager.storeSteps.deleteOrderById(foundOrderData.foundOrder.id, foundOrderData);

}

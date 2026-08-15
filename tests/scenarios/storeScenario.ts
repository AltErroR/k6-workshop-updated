import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

// setup() is for one-time global preparation before all VUs start (e.g. auth tokens, shared config).
// Per-VU data is handled inside default() to avoid shared state between VUs.
// export function setup() { return stepsManager.storeSteps.setupOrder() }

export default function () {
  const setupData = stepsManager.storeSteps.setupOrder()
  const placedOrderData = stepsManager.storeSteps.placeOrderById(setupData.testOrderId)
  const foundOrderData = stepsManager.storeSteps.getOrderById(placedOrderData.testOrderId, placedOrderData);
  const deletedOrderData = stepsManager.storeSteps.deleteOrderById(foundOrderData.foundOrder.id, foundOrderData);

}

import { group, check } from "k6";
import { requestsManager } from "../requestsManager.ts";
import { Order } from "../entities/order.ts";
import { entitiesManager } from "../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export class StoreSteps {

  placeOrderById<T extends { testOrderId?: string }>(testOrderIdToUse?: string, stepData: T = {} as T) {

    const testOrderId = testOrderIdToUse ?? stepData?.testOrderId ?? randomString(1, '123456789')
    const order: Partial<Order> = {
      id: testOrderId,
      quantity: randomString(1, '12345'),
      status: "placed",
      complete: false
    }
    return group('PlaceOrder group', function () {
      const orderToPlace: Order = entitiesManager.createOrder(order);
      const resp = requestsManager.storeService.placeOrder(
        JSON.stringify(orderToPlace)
      );
      const placedOrder: Order = JSON.parse(resp.body as string);
      return { ...stepData, testOrderId, placedOrder };
    });
  }

  getOrderById<T extends object>(testOrderId: string, stepData?: T) {
    return group('GetOrder group', function () {
      const resp = requestsManager.storeService.getOrder(testOrderId);
      const foundOrder: Order = JSON.parse(resp.body as string);
      return { ...stepData, testOrderId, foundOrder };
    });
  }

  deleteOrderById<T extends object>(orderId: string, stepData?: T): Omit<T, 'foundOrder'> {
    return group('DeleteOrder group', function () {
      const resp = requestsManager.storeService.deleteOrder(orderId);

      if (resp.status === 200) {

        const deleteResponse = JSON.parse(resp.body as string);
        check(deleteResponse, {
          'DeleteOrder: response contains id': (r) => r.message === String(orderId),
        })
      }

      const { foundOrder, ...rest } = stepData as T & { foundOrder?: Order };
      return rest as Omit<T, 'foundOrder'>;
    });
  }

  setupOrder<T extends { testOrderId?: string }>(testOrderIdToUse?: string, stepData: T = {} as T) {
    return group('SetupOrder group', function () {

      const testOrderId = testOrderIdToUse ?? stepData?.testOrderId ?? randomString(1, '123456789')
      const getResp = requestsManager.storeService.getOrder(testOrderId, undefined, [200, 404])

      if (getResp.status === 200) {

        const delResp = requestsManager.storeService.deleteOrder(testOrderId)

        if (delResp.status === 200) {

          const deleteResponse = JSON.parse(delResp.body as string);
          check(deleteResponse, {
            'SetupOrder: response contains id': (r) => r.message === testOrderId,
          })
        }
      }
      return { ...stepData, testOrderId }
    });
  }
}

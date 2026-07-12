import { group, check } from "k6";
import { requestsManager } from "../requestsManager.ts";
import { Order } from "../entities/order.ts";
import { entitiesManager } from "../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export class StoreSteps {

  placeOrder<T extends { testOrderId: string }>(stepData: T): T & { placedOrder: Order } {
    const orderId = stepData.testOrderId

    const order: Partial<Order> = {
      id: orderId,
      petId: randomString(4, '0123456789'),
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
      return { ...(stepData || {}), testOrderId: orderId, placedOrder };
    });
  }

  getOrder<T extends { testOrderId: string }>(stepData: T): T & { foundOrder: Order } {
    return group('GetOrder group', function () {
      const orderId = stepData?.testOrderId ?? randomString(1, '123456789');
      const resp = requestsManager.storeService.getOrder(orderId);
      const foundOrder: Order = JSON.parse(resp.body as string);
      return { ...(stepData || {}), testOrderId: orderId, foundOrder };
    });
  }

  deleteOrderById<T extends object>(stepData: T, orderId: string, expectedStatus: number | number[] = 200): Omit<T, 'foundOrder'> {
    return group('DeleteOrder group', function () {
      const resp = requestsManager.storeService.deleteOrder(orderId, undefined, expectedStatus);

      if (resp.status === 200) {
        const verifyResp = requestsManager.storeService.getOrder(orderId, undefined, 404);
        check(verifyResp, {
          'DeleteOrder: order not found after delete (404)': (r) => r.status === 404,
        });
      }

      const { foundOrder, ...rest } = stepData as T & { foundOrder?: Order };
      return rest as Omit<T, 'foundOrder'>;
    });
  }
}

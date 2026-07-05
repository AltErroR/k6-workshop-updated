import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
import { Order } from "../entities/order.ts";
import { entitiesManager } from "../entitiesManager.ts";
import { utilitiesManager } from "../utilitiesManager.ts";

export class StoreSteps {

  placeOrder(): { testOrderId: string, placedOrder: Order };
  placeOrder<T extends { testOrderId: string }>(stepData: T): T & { placedOrder: Order };

  placeOrder<T extends { testOrderId: string }>(stepData?: T): any {
    const orderId = stepData?.testOrderId ?? utilitiesManager.randomNumber(9);
    const order: Partial<Order> = {
      id: orderId,
      petId: utilitiesManager.randomNumber(1000),
      quantity: utilitiesManager.randomNumber(5),
      status: "placed",
      complete: false
    }
    return group('PlaceOrder group', function () {
      const orderToPlace: Order = entitiesManager.createOrder(order);
      const resp = requestsManager.storeService.placeOrder(
        JSON.stringify(orderToPlace)
      );
      utilitiesManager.log(resp,200)

      const placedOrder: Order = JSON.parse(resp.body as string);
      return { ...(stepData || {}), testOrderId: orderId, placedOrder };
    });
  }

  //overload
  getOrder(): { testOrderId: string, foundOrder: Order };
  getOrder<T extends { testOrderId: string }>(stepData: T): T & { foundOrder: Order };

  //implementation
  getOrder<T extends { testOrderId: string }>(stepData?: T): any {
    return group('GetOrder group', function () {
      const orderId = stepData?.testOrderId ?? utilitiesManager.randomNumber(9);

      const resp = requestsManager.storeService.getOrder(orderId);
      utilitiesManager.log(resp, 200);

      const foundOrder: Order = JSON.parse(resp.body as string);
      return { ...(stepData || {}), testOrderId:orderId, foundOrder };
    });
  }

  //for store steps and store scenario I decided to try to remove from set of data removed order
  //not sure if it is correct approach though
   deleteOrder<T extends {  foundOrder: Order }>(stepData: T): Omit<T, 'foundOrder'> {
    return group('DeleteOrder group', function () {
      const resp = requestsManager.storeService.deleteOrder(stepData.foundOrder.id);
      utilitiesManager.log(resp, 200);

      const { foundOrder, ...rest } = stepData as any;
      return rest as Omit<T, 'foundOrder'>;
    });
  }
}

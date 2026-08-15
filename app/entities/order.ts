//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export interface Order {
  id: string;
  petId: string;
  quantity: string;
  shipDate?: string;
  status: "placed" | "approved" | "delivered";
  complete: boolean;
}

export const createDefaultOrder = (): Order => ({
  id: randomString(1,'123456789'),
  petId: randomString(6,'0123456789'),
  quantity: "1",
  status: "placed",
  complete: false
});

export interface Order {
  id: string;
  petId: string;
  quantity: string;
  shipDate?: string;
  status: "placed" | "approved" | "delivered";
  complete: boolean;
}

export const DEFAULT_ORDER: Order = {
  id: "0",
  petId: "0",
  quantity: "1",
  status: "placed",
  complete: false
};

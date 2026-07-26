import { DEFAULT_PET, Pet } from "./entities/pet.ts";
import { DEFAULT_ORDER, Order } from "./entities/order.ts";
import { DEFAULT_USER, User } from "./entities/user.ts";


class EntitiesManger{

  createPet(overrides: Partial<Pet> = {}): Pet {
    return {
      ...DEFAULT_PET,
      ...overrides
    };
  }

  createOrder(overrides: Partial<Order> = {}): Order {
    return {
      ...DEFAULT_ORDER,
      ...overrides
    };
  }

  createUser(overrides: Partial<User> = {}): User {
    return {
      ...DEFAULT_USER,
      ...overrides
    };
  }
}


export const entitiesManager =  new EntitiesManger()

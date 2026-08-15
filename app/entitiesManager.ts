import { createDefaultPet, Pet } from "./entities/pet.ts";
import { createDefaultOrder, Order } from "./entities/order.ts";
import { createDefaultUser, User } from "./entities/user.ts";


class EntitiesManger{

  createPet(overrides: Partial<Pet> = {}): Pet {
    return {
      ...createDefaultPet(),
      ...overrides
    };
  }

  createOrder(overrides: Partial<Order> = {}): Order {
    return {
      ...createDefaultOrder(),
      ...overrides
    };
  }

  createUser(overrides: Partial<User> = {}): User {
    return {
      ...createDefaultUser(),
      ...overrides
    };
  }
}


export const entitiesManager =  new EntitiesManger()

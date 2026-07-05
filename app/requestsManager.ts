import { PetService } from "./services/petService.ts";
import { StoreService } from "./services/storeService.ts";
import { UserService } from "./services/userService.ts";


class RequestManager{

petService:PetService = new PetService()
storeService:StoreService = new StoreService()
userService:UserService = new UserService()
}

export const requestsManager = new RequestManager()

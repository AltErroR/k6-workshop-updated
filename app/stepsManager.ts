import { PetSteps } from "./steps/petSteps.ts"
import { StoreSteps } from "./steps/storeSteps.ts"
import { AddUser } from "./steps/userSteps/addUser.ts"
import { DeleteUser } from "./steps/userSteps/deleteUser.ts"
import { GetUserByUsername } from "./steps/userSteps/getUserByUsername.ts"
import { UpdateUser } from "./steps/userSteps/updateUser.ts"


class StepsManager{

    petSteps: PetSteps = new PetSteps()
    storeSteps: StoreSteps = new StoreSteps()
    addUser: AddUser = new AddUser()
    deleteUser: DeleteUser = new DeleteUser()
    getUserByUsername: GetUserByUsername = new GetUserByUsername()
    updateUser: UpdateUser = new UpdateUser()
}

export const stepsManager = new StepsManager()
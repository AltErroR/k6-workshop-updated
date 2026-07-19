import { PetSteps } from "./steps/petSteps.ts"
import { StoreSteps } from "./steps/storeSteps.ts"
import { AddUser } from "./steps/userSteps/addUser.ts"
import { DeleteUserByUsername } from "./steps/userSteps/deleteUserByUsername.ts"
import { GetUserByUsername } from "./steps/userSteps/getUserByUsername.ts"
import { SetupUser } from "./steps/userSteps/setupUser.ts"
import { UpdateUserByUsername } from "./steps/userSteps/updateUserByUsername.ts"


class StepsManager {

    petSteps: PetSteps = new PetSteps()
    storeSteps: StoreSteps = new StoreSteps()
    addUser: AddUser = new AddUser()
    deleteUserByUsername: DeleteUserByUsername = new DeleteUserByUsername()
    getUserByUsername: GetUserByUsername = new GetUserByUsername()
    updateUserByUsername: UpdateUserByUsername = new UpdateUserByUsername()
    setupUser:SetupUser = new SetupUser()
}

export const stepsManager = new StepsManager()
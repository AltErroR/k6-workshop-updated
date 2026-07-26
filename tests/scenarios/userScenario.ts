import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.setupUser.execute()
}


export default function (setupData: { username: string }) {

  const addedUserData = stepsManager.addUser.execute(setupData.username)
  const foundUserData = stepsManager.getUserByUsername.execute(addedUserData.username, addedUserData)
  const updatedUserData = stepsManager.updateUserByUsername.execute(foundUserData.username, foundUserData, foundUserData.foundUser);
  const deletedUserData = stepsManager.deleteUserByUsername.execute(updatedUserData.username, updatedUserData);

}

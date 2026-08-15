import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

// setup() is for one-time global preparation before all VUs start (e.g. auth tokens, shared config).
// Per-VU data is handled inside default() to avoid shared state between VUs.
// export function setup() { return stepsManager.setupUser.execute() }

export default function () {
  const setupData = stepsManager.setupUser.execute()
  const addedUserData = stepsManager.addUser.execute(setupData.username)
  const foundUserData = stepsManager.getUserByUsername.execute(addedUserData.username, addedUserData)
  const updatedUserData = stepsManager.updateUserByUsername.execute(foundUserData.username, foundUserData, foundUserData.foundUser);
  const deletedUserData = stepsManager.deleteUserByUsername.execute(updatedUserData.username, updatedUserData);

}

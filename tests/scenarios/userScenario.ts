import { stepsManager } from "../../app/stepsManager.ts"
export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  return stepsManager.setupUser.execute()
}


export default function (setupData: { username: string }) {

  const stepData1 = stepsManager.addUser.execute(setupData.username)
  const stepData2 = stepsManager.getUserByUsername.execute(stepData1.username,stepData1)
  const stepData3 = stepsManager.updateUserByUsername.execute(stepData2.username,stepData2, stepData2.foundUser);
  const stepData4 = stepsManager.deleteUserByUsername.execute(stepData3.username,stepData3);

}

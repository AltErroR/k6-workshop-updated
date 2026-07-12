import { stepsManager } from "../../app/stepsManager.ts"
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export { handleSummary } from "../../framework/k6Summary.ts"

export function setup() {
  const setupData1 = { username: randomString(10) }
  const setupData2 = stepsManager.deleteUserByUsername.execute(setupData1, [200, 404])
  return setupData2;
}


export default function (setupData: { username: string }) {

  const stepData1 = stepsManager.addUser.execute(setupData)
  const stepData2 = stepsManager.getUserByUsername.execute(stepData1)
  const stepData3 = stepsManager.updateUserByUsername.execute(stepData2, stepData2.foundUser);
  const stepData4 = stepsManager.deleteUserByUsername.execute(stepData3);

}

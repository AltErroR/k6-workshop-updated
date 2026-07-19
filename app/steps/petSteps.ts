import { group, check } from "k6";
//@ts-ignore
import { randomItem } from "../../framework/k6Libs/k6Libs.js"
import { requestsManager } from "../requestsManager.ts";
import { Pet } from "../entities/pet.ts"
import { entitiesManager } from "../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export class PetSteps {


  getAvailablePet<T extends object>(stepData?: T) {
    return group('Available group', function () {
      const resp = requestsManager.petService.findPetByStatus("available");
      const pets: Pet[] = JSON.parse(resp.body as string);
      const randomAvailablePet: Pet = randomItem(pets);
      return { ...stepData, foundPet: randomAvailablePet, petId: randomAvailablePet.id }
    });
  }

  findPetById<T extends object>(petId: string, stepData?: T) {
    return group('FindById group', function () {
      const resp = requestsManager.petService.findPetById(petId);
      const foundPet: Pet = JSON.parse(resp.body as string);
      return { ...stepData, foundPet, petId: foundPet.id };
    });
  }

  updateFoundPet<T extends object>(foundPetToUse: Pet, stepData: T,updates?: Partial<Pet>) {
    const defaultUpdates: Partial<Pet> = {
      name: randomString(14),
      photoUrls: ["jpg1", "png2"]
    }
    return group('UpdatePet group', function () {
      const updatedPet: Pet = {
        ...foundPetToUse,
        ...defaultUpdates,
        ...updates
      };
      const resp = requestsManager.petService.updatePet(
        JSON.stringify(updatedPet)
      );

      const foundPet: Pet = JSON.parse(resp.body as string);
      return { ...stepData, foundPet, petId: foundPet.id }
    });
  }

  addPet<T extends {petId?: string}>(petIdToUse: string ='', stepData: T= {} as T) {
    const petId =  petIdToUse ?? stepData?.petId ?? randomString(6,'0123456789')
    const filledId: Partial<Pet> = {
      id: petId
    }
    return group('AddPet group', function () {
      const petToAdd: Pet = entitiesManager.createPet(filledId);
      const resp = requestsManager.petService.addPet(
        JSON.stringify(petToAdd)
      );
      const addedPet: Pet = JSON.parse(resp.body as string);
      return { ...stepData, addedPet, petId }
    });
  }

  updateFoundPetStatus<T extends { foundPet: Pet }>(stepData: T, status: "pending" | "sold" | "available") {

    return group('UpdatePetStatus group', function () {
      const resp = requestsManager.petService.updatePetStatus(stepData.foundPet.id, stepData.foundPet.name, status);
      const respMessage = JSON.parse(resp.body as string);

      const verifyResp = requestsManager.petService.findPetById(stepData.foundPet.id);
      const verifiedPet: Pet = JSON.parse(verifyResp.body as string);

      const isSuccessful = check(verifiedPet, {
        'UpdatePetStatus: pet status matches expected': (p) => p.status === status,
      });

      if (isSuccessful) {
        const updatedPet: Pet = {
          ...stepData.foundPet,
          status: status
        }
        return { ...stepData, foundPet: updatedPet }
      }
      return { ...stepData }
    });
  }

  deletePetById<T extends object>( petId: string, stepData: T): Omit<T, 'foundPet'> {
    return group('DeletePet group', function () {
      const resp = requestsManager.petService.deletePet(petId);

      if (resp.status === 200) {
        const deleteResponse = JSON.parse(resp.body as string);
          check(deleteResponse, {
          'DeletePet: response contains id': (r) => r.message === String(petId),
        });
      }

      const { foundPet, ...rest } = stepData as T & { foundPet?: Pet };
      return rest as Omit<T, 'foundPet'>
    });
  }

  setupPet<T extends { petId?: string }>(petIdToUse?: string, stepData: T = {} as T){
      return group('SetupPet group', function () {

            const petId =  petIdToUse ?? stepData?.petId ?? randomString(6,'0123456789')
            const getResp = requestsManager.petService.findPetById(petId, undefined, [200, 404])

            if (getResp.status === 200) {

                const delResp = requestsManager.petService.deletePet(petId)

                if (delResp.status === 200) {

                    const deleteResponse = JSON.parse(delResp.body as string);
                    check(deleteResponse, {
                        'SetupPet: response contains id': (r) => r.message === String(petId),
                    })
                }
            }
            return { ...stepData, petId }
        });
  }
}
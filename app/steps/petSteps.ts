import { group, check } from "k6";
//@ts-ignore
import { randomItem } from "../../framework/k6Libs/k6Libs.js"
import { requestsManager } from "../requestsManager.ts";
import { Pet } from "../entities/pet.ts"
import { entitiesManager } from "../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export class PetSteps {


  getAvailablePet<T extends object>(stepData: T = {} as T): T & { foundPet: Pet, petId: string } {
    return group('Available group', function () {
      const resp = requestsManager.petService.findPetByStatus("available");
      const pets: Pet[] = JSON.parse(resp.body as string);
      const randomAvailablePet: Pet = randomItem(pets);
      return { ...(stepData || {}), foundPet: randomAvailablePet, petId: randomAvailablePet.id }
    });
  }

  findPetById<T extends object>(stepData: T, petId: string): T & { foundPet: Pet } {
    return group('FindById group', function () {
      const resp = requestsManager.petService.findPetById(petId);
      const foundPet: Pet = JSON.parse(resp.body as string);
      return { ...(stepData || {} as T), foundPet };
    });
  }

  updateFoundPet<T extends { foundPet: Pet }>(stepData: T): T {
    const updates: Partial<Pet> = {
      name: randomString(14),
      photoUrls: ["jpg1", "png2"]
    }
    return group('UpdatePet group', function () {
      const updatedPet: Pet = {
        ...stepData.foundPet,
        ...updates
      };
      const resp = requestsManager.petService.updatePet(
        JSON.stringify(updatedPet)
      );

      const updatedPetResult: Pet = JSON.parse(resp.body as string);
      return { ...stepData, foundPet: updatedPetResult }
    });
  }

  addPetWithId<T extends object>(petId: string, stepData: T): T & { addedPet: Pet } {
    const filledId: Partial<Pet> = {
      id: petId
    }
    return group('AddPet group', function () {
      const petToAdd: Pet = entitiesManager.createPet(filledId);
      const resp = requestsManager.petService.addPet(
        JSON.stringify(petToAdd)
      );
      const addedPet: Pet = JSON.parse(resp.body as string);
      return { ...(stepData || {}), addedPet }
    });
  }

  updateFoundPetStatus<T extends { foundPet: Pet }>(stepData: T, status: "pending" | "sold" | "available"): T {

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

  deleteFoundPet<T extends object>(stepData: T, petId: string, expectedStatus: number | number[] = 200): Omit<T, 'foundPet'> {
    return group('DeletePet group', function () {
      const resp = requestsManager.petService.deletePet(petId, undefined, expectedStatus);

      if (resp.status === 200) {
        const verifyResp = requestsManager.petService.findPetById(petId, undefined, 404);
        check(verifyResp, {
          'DeletePet: pet not found after delete (404)': (r) => r.status === 404,
        });
      }

      const { foundPet, ...rest } = stepData as T & { foundPet?: Pet };
      return rest as Omit<T, 'foundPet'>
    });
  }
}
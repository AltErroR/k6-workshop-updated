import { group, check } from "k6";
//@ts-ignore
import { expect } from 'https://jslib.k6.io/k6-testing/0.6.1/index.js';
//@ts-ignore
import { randomItem } from "../../framework/k6Libs/k6Libs.js"
import { requestsManager } from "../requestsManager.ts";
import { Pet } from "../entities/pet.ts"
import { entitiesManager } from "../entitiesManager.ts";
//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export class PetSteps {


  getAvailablePet<T extends object>(stepData?: T) {
    return group('Get available pet group', function () {
      const resp = requestsManager.petService.findPetByStatus("available");
      const pets: Pet[] = JSON.parse(resp.body as string);
      const randomAvailablePet: Pet = randomItem(pets);
      return { ...stepData, foundPet: randomAvailablePet, petId: randomAvailablePet.id }
    });
  }

  findPetById<T extends object>(petId: string, stepData?: T) {
    return group('Find pet by ID group', function () {
      const resp = requestsManager.petService.findPetById(petId);
      const foundPet: Pet = JSON.parse(resp.body as string);
      return { ...stepData, foundPet, petId: foundPet.id };
    });
  }

  updatePetByData<T extends object>(petData: Pet, stepData: T, updates?: Partial<Pet>) {
    const defaultUpdates: Partial<Pet> = {
      name: randomString(14),
      photoUrls: ["jpg1", "png2"]
    }
    return group('Update pet group', function () {
      const updatedPet: Pet = {
        ...petData,
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

  addPet<T extends { petId?: string }>(stepData?: T): T & { addedPet: Pet; petId: string }
  addPet<T extends { petId?: string }>(petId: string, stepData?: T): T & { addedPet: Pet; petId: string }
  addPet<T extends { petId?: string }>(petIdOrData?: string | T, incomingData: T = {} as T) {
    const petId: string = typeof petIdOrData === 'string'
      ? petIdOrData
      : (petIdOrData as T)?.petId ?? randomString(6, '0123456789')
    const stepData: T = (typeof petIdOrData === 'string' ? incomingData : petIdOrData ?? {} as T) as T
    const filledId: Partial<Pet> = { id: petId }
    return group('Add pet group', function () {
      const petToAdd: Pet = entitiesManager.createPet(filledId);
      const resp = requestsManager.petService.addPet(
        JSON.stringify(petToAdd)
      );
      const addedPet: Pet = JSON.parse(resp.body as string);
      return { ...stepData, addedPet, petId }
    });
  }

  updatePetStatus<T extends { foundPet: Pet }>(stepData: T, status: "pending" | "sold" | "available") {
    return group('Update pet status group', function () {
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
    return group('Delete pet by ID group', function () {
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

  setupPet<T extends { petId?: string }>(stepData?: T): T & { petId: string }
  setupPet<T extends { petId?: string }>(petId: string, stepData?: T): T & { petId: string }
  setupPet<T extends { petId?: string }>(petIdOrData?: string | T, incomingData: T = {} as T) {
    return group('Setup pet group', function () {
      const petId: string = typeof petIdOrData === 'string'
        ? petIdOrData
        : (petIdOrData as T)?.petId ?? randomString(6, '0123456789')
      const stepData: T = (typeof petIdOrData === 'string' ? incomingData : petIdOrData ?? {} as T) as T
      const getResp = requestsManager.petService.findPetById(petId, { enabledStatusCheck: false, enabledBodyCheck: false } as any)

      if (getResp.status === 200) {
        const delResp = requestsManager.petService.deletePet(petId, { enabledStatusCheck: false, enabledBodyCheck: false } as any)
        expect(delResp.status).toBe(200)
      }
      return { ...stepData, petId }
    });
  }
}
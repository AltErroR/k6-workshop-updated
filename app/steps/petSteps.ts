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
      const petData: Pet = randomItem(pets);
      return { ...stepData, petData, petId: petData.id }
    });
  }

  findPetById<T extends object>(petId: string, stepData?: T) {
    return group('Find pet by ID group', function () {
      const resp = requestsManager.petService.findPetById(petId);
      const petData: Pet = JSON.parse(resp.body as string);
      return { ...stepData, petData, petId: petData.id };
    });
  }

  updatePetByData<T extends object>(petId: string, stepData?: T, updates?: Partial<Pet>, applyDefaultUpdates: boolean = false) {
    return group('Update pet group', function () {
      const body: Partial<Pet> = {
        id: petId,
        ...(applyDefaultUpdates ? { name: randomString(14), photoUrls: ["jpg1", "png2"] } : {}),
        ...updates
      }
      const resp = requestsManager.petService.updatePet(JSON.stringify(body));
      const petData: Pet = JSON.parse(resp.body as string);
      return { ...stepData, petData, petId: petData.id }
    });
  }

  addPet<T extends { petId?: string }>(stepData?: T): T & { petData: Pet; petId: string }
  addPet<T extends { petId?: string }>(petId: string, stepData?: T): T & { petData: Pet; petId: string }
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
      const petData: Pet = JSON.parse(resp.body as string);
      return { ...stepData, petData, petId }
    });
  }

  updatePetStatus<T extends { petData: Pet }>(stepData: T, status: "pending" | "sold" | "available") {
    return group('Update pet status group', function () {
      const resp = requestsManager.petService.updatePetStatus(stepData.petData.id, stepData.petData.name, status);
      const responseBody = JSON.parse(resp.body as string);

      const isSuccessful = check(responseBody, {
        'UpdatePetStatus: response code is 200': (r) => r.code === 200,
      });

      if (isSuccessful) {
        return { ...stepData, petData: { ...stepData.petData, status } as Pet }
      }
      return { ...stepData }
    });
  }

  deletePetById<T extends object>(petId: string, stepData: T) {
    return group('Delete pet by ID group', function () {
      const resp = requestsManager.petService.deletePet(petId);

      if (resp.status === 200) {
        const deleteResponse = JSON.parse(resp.body as string);
          check(deleteResponse, {
          'DeletePet: response contains id': (r) => r.message === String(petId),
        });
      }

      const { petData, ...rest } = stepData as T & { petData?: Pet };
      return rest as Omit<T, 'petData'>
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
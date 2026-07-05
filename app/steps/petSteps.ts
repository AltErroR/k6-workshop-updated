import { group } from "k6";
//@ts-ignore
import { randomItem } from "../../framework/k6Libs/k6Libs.js"
import { requestsManager } from "../requestsManager.ts";
import { Pet } from "../entities/pet.ts"
import { entitiesManager } from "../entitiesManager.ts";
import { utilitiesManager } from "../utilitiesManager.ts";

export class PetSteps {

  // getPendingPet<T extends object = {}>(stepData?: T): T & { randomPendingPet: Pet } {
  //   return group('Pending group', function () {
  //     const resp = requestsManager.petService.findPetByStatus("pending");
  //     utilitiesManager.log(resp, 200)

  //     const pets: Pet[] = JSON.parse(resp.body as string);
  //     const randomPendingPet: Pet = randomItem(pets);
  //     return { ...(stepData || {} as T), randomPendingPet };
  //   });
  // }

  getAvailablePet(): { randomAvailablePet: Pet };
  getAvailablePet<T extends object>(stepData: T): T & { randomAvailablePet: Pet };

  getAvailablePet<T extends object>(stepData?: T): any {
    return group('Available group', function () {
      const resp = requestsManager.petService.findPetByStatus("available");
      utilitiesManager.log(resp, 200)

      const pets: Pet[] = JSON.parse(resp.body as string);
      const randomAvailablePet: Pet = randomItem(pets);
      return { ...(stepData || {}), randomAvailablePet }
    });
  }

  // getSoldPet<T extends object = {}>(stepData?: T): T & { randomSoldPet: Pet } {
  //   return group('Sold group', function () {
  //     const resp = requestsManager.petService.findPetByStatus("sold");
  //     utilitiesManager.log(resp, 200)

  //     const pets: Pet[] = JSON.parse(resp.body as string);
  //     const randomSoldPet: Pet = randomItem(pets);
  //     return { ...(stepData || {} as T), randomSoldPet };
  //   });
  // }

  findAvailablePetById<T extends { randomAvailablePet: Pet }>(stepData: T): T & { foundPetById: Pet } {
    const foundPetById = this.findPetById(stepData.randomAvailablePet.id)
    return { ...(stepData || {} as T), foundPetById };
  }
  
  findFoundPetById<T extends { foundPetById: Pet }>(stepData: T): T & { foundRemovedPet: Pet } {
    const foundRemovedPet = this.findPetById(stepData.foundPetById.id)
    return { ...(stepData || {} as T), foundRemovedPet };
  }

  // findPendingPetById<T extends { randomPendingPet: Pet }>(stepData: T): T & { foundPetById: Pet } {
  //   const foundPetById = this.findPetById(stepData.randomPendingPet.id)
  //   return { ...(stepData || {} as T), foundPetById };
  // }

  // findSoldPetById<T extends { randomSoldPet: Pet }>(stepData: T): T & { foundPetById: Pet } {
  //   const foundPetById = this.findPetById(stepData.randomSoldPet.id)
  //   return { ...(stepData || {} as T), foundPetById };
  // }

  updateFoundPet<T extends { foundPetById: Pet }>(stepData: T): T {
    const updatedFoundPetById = this.updatePet(stepData.foundPetById)
    return { ...stepData, foundPetById:updatedFoundPetById }
  }

  // updatePendingPet<T extends { randomPendingPet: Pet }>(stepData: T): T & { updatedPet: Pet } {
  //   const updatedPet = this.updatePet(stepData.randomPendingPet)
  //   return { ...(stepData || {} as T), updatedPet }
  // }

  // updateSoldPet<T extends { randomSoldPet: Pet }>(stepData: T): T & { updatedPet: Pet } {
  //   const updatedPet = this.updatePet(stepData.randomSoldPet)
  //   return { ...(stepData || {} as T), updatedPet }
  // }

  addAvailablePet(): { randomAvailablePet: Pet };
  addAvailablePet<T extends { randomAvailablePet: Pet }>(stepData: T): T;

  addAvailablePet<T extends { randomAvailablePet: Pet }>(stepData?: T): any {
    const filledId: Partial<Pet> = {
      id: stepData?.randomAvailablePet?.id
    }
    return group('AddPet group', function () {
      const petToAdd: Pet = entitiesManager.createPet(filledId);
      const resp = requestsManager.petService.addOrUpdatePet(
        JSON.stringify(petToAdd)
      );
      utilitiesManager.log(resp, 200)

      const addedPet: Pet = JSON.parse(resp.body as string);
      return { ...(stepData || {}), randomAvailablePet:addedPet }
    });
  }

  updateFoundPetStatus<T extends { foundPetById: Pet }>(stepData: T, status: "pending" | "sold"): T {
    this.updatePetStatus(stepData.foundPetById.id, stepData.foundPetById.name, status)
    const updatedPet: Pet = {
      ...stepData.foundPetById,
      status: status
    }
    return  { ...stepData, foundPetById:updatedPet }
  }

  // updateSoldPetStatus<T extends { randomSoldPet: Pet }>(stepData: T, status: "available" | "pending"): void {
  //   this.updatePetStatus(stepData.randomSoldPet.id, stepData.randomSoldPet.name, status)
  // }

  // updatePendingPetStatus<T extends { randomPendingPet: Pet }>(stepData: T, status: "available" | "sold"): void {
  //   this.updatePetStatus(stepData.randomPendingPet.id, stepData.randomPendingPet.name, status)
  // }

  deleteAvailablePet<T extends { randomAvailablePet: Pet }>(stepData: T): void {
    this.deletePet(stepData.randomAvailablePet.id)
  }

  deleteFoundPet<T extends { foundPetById: Pet }>(stepData: T): void {
    this.deletePet(stepData.foundPetById.id)
  }

  // deleteSoldPetStatus<T extends { randomSoldPet: Pet }>(stepData: T): void {
  //   this.deletePet(stepData.randomSoldPet.id)
  // }

  // deletePendingPetStatus<T extends { randomPendingPet: Pet }>(stepData: T): void {
  //   this.deletePet(stepData.randomPendingPet.id)
  // }

  private updatePetStatus<T extends object>(id: string, name: string, status: "available" | "pending" | "sold"): T {
    return group('UpdatePetStatus group', function () {
      const resp = requestsManager.petService.updatePetStatus(id, name, status);
      utilitiesManager.log(resp, 200)
      const respMessage = JSON.parse(resp.body as string);
      return respMessage;
    });
  }

  private deletePet(id: string): void {
    group('DeletePet group', function () {
      const resp = requestsManager.petService.deletePet(id);
      utilitiesManager.log(resp, 200)
    });
  }

  private findPetById(id: string): Pet {
    {
      return group('FindById group', function () {
        const resp = requestsManager.petService.findPetById(id);
        utilitiesManager.log(resp, 200)

        const foundPetById: Pet = JSON.parse(resp.body as string);
        return foundPetById
      });
    }
  }

  private updatePet(pet: Pet): Pet {
    const updates: Partial<Pet> = {
      name: utilitiesManager.randomString(14),
      photoUrls: ["jpg1", "png2"]
    }
    return group('AddOrUpdatePet group', function () {
      const petToUpdate: Pet = {
        ...pet,
        ...updates
      };
      const resp = requestsManager.petService.addOrUpdatePet(
        JSON.stringify(petToUpdate)
      );
      utilitiesManager.log(resp, 200)

      const updatedPet: Pet = JSON.parse(resp.body as string);
      return updatedPet;
    });
  }
}
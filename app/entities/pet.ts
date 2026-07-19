//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export interface Pet {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  };
  photoUrls: string[];
  tags?: Array<{
    id: string;
    name: string;
  }>;
  status: "available" | "pending" | "sold";
}

export const DEFAULT_PET: Pet = {
  id: randomString(6,'0123456789'),
  name: "string",
  photoUrls: ["string"],
  status: "available",
  category: {
    id: "0",
    name: "string"
  },
  tags: [{
    id: "0",
    name: "string"
  }]
};
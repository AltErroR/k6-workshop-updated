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
  id: "0",
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
export type ServiceType =
  | "Standard Clean"
  | "Deep Clean"
  | "Car Wash"
  | "Laundry Assist"
  | "Carpet Cleaning"
  | "Couch Cleaning"
  | "Move-in / Move-out Clean"
  | "Garden Cleanup";

export type Cleaner = {
  id: string;
  name: "Jerry" | "Sam" | "Clark" | "Thabang" | "Zama";
  rating: number;
  jobs: number;
  suburb: string; // Randburg suburb
  services: ServiceType[];
};

export const cleaners: Cleaner[] = [
  {
    id: "jerry",
    name: "Jerry",
    rating: 4.8,
    jobs: 128,
    suburb: "Cresta",
    services: ["Standard Clean", "Deep Clean", "Move-in / Move-out Clean"],
  },
  {
    id: "sam",
    name: "Sam",
    rating: 4.5,
    jobs: 92,
    suburb: "Ferndale",
    services: ["Standard Clean", "Laundry Assist", "Car Wash"],
  },
  {
    id: "clark",
    name: "Clark",
    rating: 4.9,
    jobs: 210,
    suburb: "Northcliff",
    services: ["Deep Clean", "Carpet Cleaning", "Couch Cleaning"],
  },
  {
    id: "thabang",
    name: "Thabang",
    rating: 4.6,
    jobs: 74,
    suburb: "Randpark Ridge",
    services: ["Standard Clean", "Garden Cleanup", "Car Wash"],
  },
  {
    id: "zama",
    name: "Zama",
    rating: 5.0,
    jobs: 56,
    suburb: "Blairgowrie",
    services: ["Standard Clean", "Deep Clean", "Laundry Assist", "Move-in / Move-out Clean"],
  },
];

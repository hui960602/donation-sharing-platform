export interface DonatedItem {
  id: string;
  itemName: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  contactEmail: string;
  imageBase64: string;
  createdAt: string;
}

export const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Kitchen",
  "Sports",
  "Toys",
  "Other"
] as const;

export const CONDITIONS = [
  "Like New",
  "Good",
  "Fair",
  "Needs Repair"
] as const;

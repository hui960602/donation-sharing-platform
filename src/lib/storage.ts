import { DonatedItem } from "@/types/donation";

const STORAGE_KEY = "donatedItems";

export function getDonatedItems(): DonatedItem[] {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
}

export function saveDonatedItem(item: DonatedItem): void {
  try {
    const items = getDonatedItems();
    items.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("Failed to save donation");
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function deleteDonatedItem(itemId: string): boolean {
  try {
    const items = getDonatedItems();
    const filteredItems = items.filter((item) => item.id !== itemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
    return true;
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
    return false;
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export type StorageLocation = 'pantry' | 'fridge' | 'freezer';

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  storageLocation: StorageLocation;
  userId: string;
  imageUrl?: string;
  createdAt: Date;
};

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
};

export type ShoppingListItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  isPurchased: boolean;
  userId: string;
  createdAt: Date;
};

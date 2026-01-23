export type StorageLocation = 'pantry' | 'fridge' | 'freezer';

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  storage: StorageLocation;
  imageUrl?: string;
  expiryDate?: Date;
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
  checked: boolean;
};

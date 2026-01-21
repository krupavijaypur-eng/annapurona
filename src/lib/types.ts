export type StorageLocation = 'pantry' | 'fridge' | 'freezer';

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  storage: StorageLocation;
  imageUrl?: string;
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
  checked: boolean;
};

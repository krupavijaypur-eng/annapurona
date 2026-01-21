import type { InventoryItem, ShoppingListItem } from '@/lib/types';

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    quantity: 1,
    storage: 'fridge',
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    quantity: 1,
    storage: 'pantry',
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    storage: 'freezer',
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 5,
    storage: 'fridge',
  },
  {
    id: '5',
    name: 'Spinach',
    quantity: 1,
    storage: 'fridge',
  },
  {
    id: '6',
    name: 'Cheddar Cheese',
    quantity: 1,
    storage: 'fridge',
  },
    {
    id: '7',
    name: 'Onions',
    quantity: 3,
    storage: 'pantry',
  },
];

export const mockShoppingList: ShoppingListItem[] = [
  { id: '1', name: 'Eggs', quantity: 12, checked: false },
  { id: '2', name: 'Butter', quantity: 1, checked: false },
  { id: '3', name: 'Potatoes', quantity: 5, checked: true },
  { id: '4', name: 'Garlic', quantity: 2, checked: false },
];

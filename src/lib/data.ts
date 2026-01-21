import type { InventoryItem, ShoppingListItem } from '@/lib/types';
import { add } from 'date-fns';

// Using a fixed date to ensure consistency between server and client renders
const consistentDate = new Date('2024-07-20T12:00:00.000Z');

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    quantity: 1,
    storage: 'fridge',
    expiryDate: add(consistentDate, { days: 2 }),
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    quantity: 1,
    storage: 'pantry',
    expiryDate: add(consistentDate, { days: 4 }),
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    storage: 'freezer',
    expiryDate: add(consistentDate, { months: 2 }),
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 5,
    storage: 'fridge',
    expiryDate: add(consistentDate, { days: 6 }),
  },
  {
    id: '5',
    name: 'Spinach',
    quantity: 1,
    storage: 'fridge',
    expiryDate: add(consistentDate, { days: 1 }),
  },
  {
    id: '6',
    name: 'Cheddar Cheese',
    quantity: 1,
    storage: 'fridge',
    expiryDate: add(consistentDate, { weeks: 3 }),
  },
    {
    id: '7',
    name: 'Onions',
    quantity: 3,
    storage: 'pantry',
    expiryDate: add(consistentDate, { weeks: 4 }),
  },
];

export const mockShoppingList: ShoppingListItem[] = [
  { id: '1', name: 'Eggs', quantity: 12, checked: false },
  { id: '2', name: 'Butter', quantity: 1, checked: false },
  { id: '3', name: 'Potatoes', quantity: 5, checked: true },
  { id: '4', name: 'Garlic', quantity: 2, checked: false },
];

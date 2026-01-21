import type { InventoryItem, ShoppingListItem } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl;

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Fresh Milk',
    quantity: 1,
    storage: 'fridge',
    imageUrl: getImage('item-milk'),
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    quantity: 1,
    storage: 'pantry',
    imageUrl: getImage('item-bread'),
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 2,
    storage: 'freezer',
    imageUrl: getImage('item-chicken'),
  },
  {
    id: '4',
    name: 'Tomatoes',
    quantity: 5,
    storage: 'fridge',
    imageUrl: getImage('item-tomatoes'),
  },
  {
    id: '5',
    name: 'Spinach',
    quantity: 1,
    storage: 'fridge',
    imageUrl: getImage('item-spinach'),
  },
  {
    id: '6',
    name: 'Cheddar Cheese',
    quantity: 1,
    storage: 'fridge',
    imageUrl: getImage('item-cheese'),
  },
    {
    id: '7',
    name: 'Onions',
    quantity: 3,
    storage: 'pantry',
    imageUrl: getImage('item-onions'),
  },
];

export const mockShoppingList: ShoppingListItem[] = [
  { id: '1', name: 'Eggs', quantity: 12, checked: false },
  { id: '2', name: 'Butter', quantity: 1, checked: false },
  { id: '3', name: 'Potatoes', quantity: 5, checked: true },
  { id: '4', name: 'Garlic', quantity: 2, checked: false },
];

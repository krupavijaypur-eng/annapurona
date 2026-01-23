'use client';

import * as React from 'react';
import { InventoryItem, ShoppingListItem } from '@/lib/types';

interface AppContextType {
  inventory: InventoryItem[];
  shoppingList: ShoppingListItem[];
  isDataLoaded: boolean;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'imageUrl'>) => void;
  deleteInventoryItem: (id: string) => void;
  addShoppingListItem: (item: Omit<ShoppingListItem, 'id' | 'checked'>) => void;
  toggleShoppingListItem: (id: string) => void;
  clearCheckedShoppingListItems: () => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = React.useState<InventoryItem[]>([]);
  const [shoppingList, setShoppingList] = React.useState<ShoppingListItem[]>([]);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedInventory = localStorage.getItem('inventory');
      const storedShoppingList = localStorage.getItem('shoppingList');
      if (storedInventory) {
        const parsedInventory = JSON.parse(storedInventory).map((item: InventoryItem) => ({
            ...item,
            expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined,
        }));
        setInventory(parsedInventory);
      }
      if (storedShoppingList) {
        setShoppingList(JSON.parse(storedShoppingList));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
        setIsDataLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    if(isDataLoaded) {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory, isDataLoaded]);

  React.useEffect(() => {
    if(isDataLoaded) {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }
  }, [shoppingList, isDataLoaded]);

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'imageUrl'>) => {
    const newId = new Date().toISOString();
    const newItem: InventoryItem = {
      ...item,
      id: newId,
      imageUrl: `https://picsum.photos/seed/${newId}/100/100`,
    };
    setInventory(prev => [...prev, newItem]);
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const addShoppingListItem = (item: Omit<ShoppingListItem, 'id' | 'checked'>) => {
    const newItem: ShoppingListItem = {
      ...item,
      id: new Date().toISOString(),
      checked: false,
    };
    setShoppingList(prev => [...prev, newItem]);
  };

  const toggleShoppingListItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const clearCheckedShoppingListItems = () => {
    setShoppingList(prev => prev.filter(item => !item.checked));
  };

  const value = {
    inventory,
    shoppingList,
    isDataLoaded,
    addInventoryItem,
    deleteInventoryItem,
    addShoppingListItem,
    toggleShoppingListItem,
    clearCheckedShoppingListItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

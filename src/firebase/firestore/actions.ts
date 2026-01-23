'use client';

import {
  collection,
  doc,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import {
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import type { InventoryItem, ShoppingListItem } from '@/lib/types';

// Inventory Actions
export function addInventoryItem(firestore: Firestore, userId: string, item: Omit<InventoryItem, 'id' | 'userId' | 'createdAt'>) {
  const inventoryCollection = collection(firestore, `users/${userId}/inventoryItems`);
  addDocumentNonBlocking(inventoryCollection, {
    ...item,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function deleteInventoryItem(firestore: Firestore, userId: string, itemId: string) {
  const itemDoc = doc(firestore, `users/${userId}/inventoryItems`, itemId);
  deleteDocumentNonBlocking(itemDoc);
}

// Shopping List Actions
export function addShoppingListItem(firestore: Firestore, userId: string, item: Omit<ShoppingListItem, 'id' | 'userId' | 'createdAt'>) {
  const shoppingListCollection = collection(firestore, `users/${userId}/shoppingListItems`);
  addDocumentNonBlocking(shoppingListCollection, {
    ...item,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function updateShoppingListItem(firestore: Firestore, userId: string, itemId: string, updates: Partial<ShoppingListItem>) {
  const itemDoc = doc(firestore, `users/${userId}/shoppingListItems`, itemId);
  updateDocumentNonBlocking(itemDoc, updates);
}

export function deleteShoppingListItem(firestore: Firestore, userId: string, itemId: string) {
    const itemDoc = doc(firestore, `users/${userId}/shoppingListItems`, itemId);
    deleteDocumentNonBlocking(itemDoc);
}

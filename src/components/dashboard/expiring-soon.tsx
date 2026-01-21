'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { mockInventory } from '@/lib/data';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { type InventoryItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function getBadgeVariant(days: number): 'default' | 'destructive' | 'secondary' {
  if (days <= 1) return 'destructive';
  if (days <= 3) return 'default';
  return 'secondary';
}

type ExpiringItem = InventoryItem & { daysLeft: number };

export function ExpiringSoon() {
  const [expiringSoon, setExpiringSoon] = useState<ExpiringItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    const expiring = mockInventory
      .map((item) => ({
        ...item,
        daysLeft: differenceInDays(item.expiryDate, new Date()),
      }))
      .filter((item) => item.daysLeft <= 7)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);
    setExpiringSoon(expiring);
    setIsClient(true);
  }, []);

  // On the server and for the initial client render, show a skeleton.
  if (!isClient) {
    return (
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <AlertTriangle className="text-accent" /> Expiring Soon
        </h3>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
              <Skeleton className="h-6 w-[60px] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // After client-side hydration, render the actual content.
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <AlertTriangle className="text-accent" /> Expiring Soon
      </h3>
      {expiringSoon.length > 0 ? (
        <ul className="space-y-2">
          {expiringSoon.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  Expires in {formatDistanceToNow(item.expiryDate, { addSuffix: true })}
                </p>
              </div>
              <Badge variant={getBadgeVariant(item.daysLeft)}>
                {item.daysLeft <= 0 ? 'Expired' : `${item.daysLeft}d left`}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">
          Nothing is expiring soon. Great job!
        </p>
      )}
    </div>
  );
}

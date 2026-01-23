'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { mockInventory } from '@/lib/data';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { type InventoryItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function getBadgeVariant(days: number): 'default' | 'destructive' | 'secondary' {
  if (days <= 1) return 'destructive';
  if (days <= 3) return 'default';
  return 'secondary';
}

type ExpiringItem = InventoryItem & { daysLeft: number };

export function ExpiringSoon() {
  const [expiringSoon, setExpiringSoon] = useState<ExpiringItem[] | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    const expiring = mockInventory
      .filter((item): item is InventoryItem & { expiryDate: Date } => !!item.expiryDate)
      .map((item) => ({
        ...item,
        daysLeft: differenceInDays(item.expiryDate, new Date()),
      }))
      .filter((item) => item.daysLeft <= 7)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);
    setExpiringSoon(expiring);
  }, []);

  if (expiringSoon === null) {
    return (
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="text-accent" /> Expiring Soon
            </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }

  return (
     <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="text-accent" /> Expiring Soon
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
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
                        Expires {formatDistanceToNow(item.expiryDate, { addSuffix: true })}
                        </p>
                    </div>
                    <Badge variant={getBadgeVariant(item.daysLeft)}>
                        {item.daysLeft <= 0 ? 'Expired' : `${item.daysLeft}d left`}
                    </Badge>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="flex h-full items-center justify-center">
                    <p className="text-center text-muted-foreground">
                    Nothing is expiring soon. Great job!
                    </p>
                </div>
            )}
        </CardContent>
      </Card>
  );
}

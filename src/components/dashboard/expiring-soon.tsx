'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { differenceInDays, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { AlertTriangle } from 'lucide-react';
import { type InventoryItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useLanguage } from '@/context/LanguageContext';
import { enUS, hi, kn } from 'date-fns/locale';

const locales = { en: enUS, hi, kn };

function getBadgeVariant(days: number): 'default' | 'destructive' | 'secondary' {
  if (days <= 1) return 'destructive';
  if (days <= 3) return 'default';
  return 'secondary';
}

type ExpiringItem = InventoryItem & { daysLeft: number };

export function ExpiringSoon() {
  const { firestore, user } = useFirebase();
  const { t, locale } = useLanguage();
  const [expiringSoon, setExpiringSoon] = useState<ExpiringItem[] | null>(null);

  const inventoryQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `users/${user.uid}/inventoryItems`);
  }, [firestore, user]);

  const { data: inventory, isLoading } = useCollection<InventoryItem>(inventoryQuery);

  useEffect(() => {
    if (!isLoading && inventory) {
      const expiring = inventory
        .filter((item): item is InventoryItem & { expiryDate: Date } => !!item.expiryDate)
        .map((item) => ({
          ...item,
          expiryDate: new Date(item.expiryDate), // Ensure it's a Date object
          daysLeft: differenceInDays(new Date(item.expiryDate), new Date()),
        }))
        .filter((item) => item.daysLeft <= 7)
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 5);
      setExpiringSoon(expiring);
    }
  }, [inventory, isLoading]);

  if (expiringSoon === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="text-accent" /> {t('dashboard.expiringSoon')}
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

  const getExpiryText = (item: ExpiringItem) => {
    const distance = formatDistanceToNowStrict(item.expiryDate, { addSuffix: false, locale: locales[locale] });
    if (item.daysLeft < 0) {
        return t('dashboard.expiredAgo').replace('{distance}', distance);
    }
    return t('dashboard.expiresIn').replace('{distance}', distance);
  }

  const getBadgeText = (item: ExpiringItem) => {
      if (item.daysLeft < 0) return t('dashboard.expired');
      if (item.daysLeft === 0) return t('dashboard.expiresToday');
      return t('dashboard.daysLeft').replace('{count}', String(item.daysLeft));
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="text-accent" /> {t('dashboard.expiringSoon')}
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
                    {getExpiryText(item)}
                  </p>
                </div>
                <Badge variant={getBadgeVariant(item.daysLeft)}>
                  {getBadgeText(item)}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-muted-foreground">
              {t('dashboard.nothingExpiring')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

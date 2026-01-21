import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockInventory } from '@/lib/data';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { AlertTriangle } from 'lucide-react';

function getBadgeVariant(days: number): 'default' | 'destructive' | 'secondary' {
  if (days <= 1) return 'destructive';
  if (days <= 3) return 'default';
  return 'secondary';
}

export function ExpiringSoon() {
  const expiringSoon = mockInventory
    .map(item => ({...item, daysLeft: differenceInDays(item.expiryDate, new Date())}))
    .filter(item => item.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <AlertTriangle className="text-accent" /> Expiring Soon
      </h3>
      {expiringSoon.length > 0 ? (
        <ul className="space-y-2">
          {expiringSoon.map(item => (
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
        <p className="text-muted-foreground">Nothing is expiring soon. Great job!</p>
      )}
    </div>
  );
}

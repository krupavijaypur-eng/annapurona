import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ShoppingBasket } from 'lucide-react';
import { mockShoppingList } from '@/lib/data';
import { ScrollArea } from '../ui/scroll-area';

export function ShoppingListSummary() {
    const listToShow = mockShoppingList.slice(0, 4);

  return (
    <Card className="flex flex-col">
      <CardHeader>
      <div className="flex items-center gap-2">
            <ShoppingBasket className="text-primary"/>
            <CardTitle>Shopping List</CardTitle>
        </div>
        <CardDescription>
          A quick look at what you need to buy.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-48">
            <ul className="space-y-3">
            {listToShow.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                <Checkbox id={`summary-${item.id}`} checked={item.checked} />
                <label
                    htmlFor={`summary-${item.id}`}
                    className={`flex-1 text-sm ${item.checked ? 'text-muted-foreground line-through' : ''}`}
                >
                    {item.name} ({item.quantity})
                </label>
                </li>
            ))}
            </ul>
        </ScrollArea>
      </CardContent>
      <div className="p-6 pt-0">
        <Link href="/dashboard/shopping-list">
          <Button className="w-full" variant="outline">
            View Full List <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

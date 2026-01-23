"use client"

import * as React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, StorageLocation } from "@/lib/types"
import { Refrigerator, Snowflake, Archive, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format, differenceInDays } from "date-fns"
import { enUS, hi, kn } from 'date-fns/locale'
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/context/LanguageContext"

const locales = { en: enUS, hi, kn };

const storageIcons: Record<StorageLocation, React.ReactNode> = {
  fridge: <Refrigerator className="mr-2 h-4 w-4 text-blue-500" />,
  freezer: <Snowflake className="mr-2 h-4 w-4 text-cyan-400" />,
  pantry: <Archive className="mr-2 h-4 w-4 text-amber-600" />,
}

function getBadgeVariant(days: number): 'default' | 'destructive' | 'secondary' {
    if (days <= 1) return 'destructive';
    if (days <= 3) return 'default';
    return 'secondary';
}

const ExpiryCell = ({ row }: { row: { original: InventoryItem } }) => {
    const { t, locale } = useLanguage();
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);

    const { expiryDate } = row.original;

    if (!expiryDate) {
        return <div className="text-center">-</div>;
    }
    
    if (!hydrated) {
        return (
             <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16" />
            </div>
        );
    }
    
    const daysLeft = differenceInDays(expiryDate, new Date());
    const badgeText = daysLeft < 0 
        ? t('inventory.columns.expired') 
        : daysLeft === 0 
            ? t('inventory.columns.expiresToday') 
            : t('inventory.columns.daysLeft').replace('{count}', String(daysLeft));

    return (
        <div className="flex flex-col items-center gap-1">
            <span>{format(expiryDate, "PPP", { locale: locales[locale] })}</span>
            <Badge variant={getBadgeVariant(daysLeft)}>
                {badgeText}
            </Badge>
        </div>
    );
};

const ItemCell = ({ row }: { row: { original: InventoryItem } }) => {
    const { t } = useLanguage();
    const item = row.original;
    return (
        <div className="flex items-center gap-3">
          {item.imageUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              {t('inventory.columns.noImage')}
            </div>
          )}
          <span>{item.name}</span>
        </div>
      )
}

const LocationCell = ({ row }: { row: { original: InventoryItem } }) => {
    const { t } = useLanguage();
    const location = row.original.storageLocation;
    const locationText = t(`common.${location.toLowerCase()}`);

    return (
        <div className="flex items-center">
            {storageIcons[location]}
            <span className="capitalize">{locationText}</span>
        </div>
    )
}

const ActionsCell = ({ row, onDeleteItem }: { row: { original: InventoryItem }, onDeleteItem: (id: string) => void }) => {
    const { t } = useLanguage();
    const item = row.original;

    return (
        <div className="text-right">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onDeleteItem(item.id)} className="text-destructive cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t('common.delete')}
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


export const getColumns = (onDeleteItem: (id: string) => void, t: (key: string) => string): ColumnDef<InventoryItem>[] => [
  {
    accessorKey: "name",
    header: t('inventory.columns.item'),
    cell: ItemCell,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">{t('inventory.columns.quantity')}</div>,
    cell: ({ row }) => {
        const item = row.original;
        return <div className="text-center">{`${item.quantity} ${item.unit}`}</div>
    },
  },
  {
    accessorKey: "storageLocation",
    header: t('inventory.columns.location'),
    cell: LocationCell,
  },
  {
    accessorKey: "expiryDate",
    header: () => <div className="text-center">{t('inventory.columns.expires')}</div>,
    cell: ExpiryCell,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} onDeleteItem={onDeleteItem} />,
  },
]

"use client"

import * as React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, StorageLocation } from "@/lib/types"
import { Refrigerator, Snowflake, Archive, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format, differenceInDays } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

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

const ExpiryCell = ({ row }: { row: any }) => {
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);

    const expiryDate = row.original.expiryDate;

    if (!expiryDate) {
        return <div className="text-center">-</div>;
    }

    const date = new Date(expiryDate);
    const daysLeft = differenceInDays(date, new Date());

    if (!hydrated) {
        return (
             <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <span>{format(date, "MMM d, yyyy")}</span>
            <Badge variant={getBadgeVariant(daysLeft)}>
                {daysLeft <= 0 ? 'Expired' : `${daysLeft}d left`}
            </Badge>
        </div>
    );
};


export const getColumns = (onDeleteItem: (id: string) => void): ColumnDef<InventoryItem>[] => [
  {
    accessorKey: "name",
    header: "Item",
    cell: ({ row }) => {
      const item = row.original
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
              No img
            </div>
          )}
          <span>{item.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
        const item = row.original;
        return <div className="text-center">{`${item.quantity} ${item.unit}`}</div>
    },
  },
  {
    accessorKey: "storage",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("storage") as StorageLocation;
      return (
        <div className="flex items-center">
          {storageIcons[location]}
          <span className="capitalize">{location}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "expiryDate",
    header: () => <div className="text-center">Expires</div>,
    cell: ExpiryCell,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

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
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, StorageLocation } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { format, differenceInDays } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Refrigerator, Snowflake, Archive } from "lucide-react"

const storageIcons: Record<StorageLocation, React.ReactNode> = {
  fridge: <Refrigerator className="mr-2 h-4 w-4 text-blue-500" />,
  freezer: <Snowflake className="mr-2 h-4 w-4 text-cyan-400" />,
  pantry: <Archive className="mr-2 h-4 w-4 text-amber-600" />,
}

function getExpiryBadge(date: Date): React.ReactNode {
  const daysLeft = differenceInDays(date, new Date());
  let variant: 'destructive' | 'default' | 'secondary' = 'secondary';
  let text = `${daysLeft} days left`;

  if (daysLeft <= 0) {
    variant = 'destructive';
    text = 'Expired';
  } else if (daysLeft <= 3) {
    variant = 'destructive';
    text = `${daysLeft}d left`;
  } else if (daysLeft <= 7) {
    variant = 'default';
    text = `${daysLeft}d left`;
  }
  
  return <Badge variant={variant}>{text}</Badge>;
}

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "name",
    header: "Item",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="text-center">{row.getValue("quantity")}</div>,
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
    header: "Expires",
    cell: ({ row }) => {
      const date = row.getValue("expiryDate") as Date;
      return (
        <div className="flex flex-col">
          <span>{format(date, "MMM dd, yyyy")}</span>
          {getExpiryBadge(date)}
        </div>
      )
    },
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.name)}
                >
                Copy item name
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit item</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete item</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]

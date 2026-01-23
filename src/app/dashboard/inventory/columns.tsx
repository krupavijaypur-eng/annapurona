"use client"

import * as React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, StorageLocation } from "@/lib/types"
import { Refrigerator, Snowflake, Archive, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const storageIcons: Record<StorageLocation, React.ReactNode> = {
  fridge: <Refrigerator className="mr-2 h-4 w-4 text-blue-500" />,
  freezer: <Snowflake className="mr-2 h-4 w-4 text-cyan-400" />,
  pantry: <Archive className="mr-2 h-4 w-4 text-amber-600" />,
}

const ItemCell = ({ row }: { row: { original: InventoryItem } }) => {
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
              No img
            </div>
          )}
          <span>{item.name}</span>
        </div>
      )
}

const LocationCell = ({ row }: { row: { original: InventoryItem } }) => {
    const location = row.original.storageLocation;

    return (
        <div className="flex items-center">
            {storageIcons[location]}
            <span className="capitalize">{location}</span>
        </div>
    )
}

const ActionsCell = ({ row, onDeleteItem }: { row: { original: InventoryItem }, onDeleteItem: (id: string) => void }) => {
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
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


export const getColumns = (onDeleteItem: (id: string) => void): ColumnDef<InventoryItem>[] => [
  {
    accessorKey: "name",
    header: "Item",
    cell: ItemCell,
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
    accessorKey: "storageLocation",
    header: "Location",
    cell: LocationCell,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} onDeleteItem={onDeleteItem} />,
  },
]

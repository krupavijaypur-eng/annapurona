"use client"

import * as React from "react"
import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { InventoryItem, StorageLocation } from "@/lib/types"
import { Refrigerator, Snowflake, Archive } from "lucide-react"

const storageIcons: Record<StorageLocation, React.ReactNode> = {
  fridge: <Refrigerator className="mr-2 h-4 w-4 text-blue-500" />,
  freezer: <Snowflake className="mr-2 h-4 w-4 text-cyan-400" />,
  pantry: <Archive className="mr-2 h-4 w-4 text-amber-600" />,
}

export const columns: ColumnDef<InventoryItem>[] = [
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
]

"use client"

import * as React from "react"
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

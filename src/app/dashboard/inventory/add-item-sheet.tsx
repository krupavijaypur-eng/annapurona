"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Camera, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function AddItemSheet() {
    const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Item
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Item</SheetTitle>
          <SheetDescription>
            Enter the details of your new grocery item.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="e.g. Organic Apples" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input id="quantity" type="number" defaultValue="1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storage" className="text-right">
              Location
            </Label>
            <Select>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select storage location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fridge">Fridge</SelectItem>
                    <SelectItem value="freezer">Freezer</SelectItem>
                    <SelectItem value="pantry">Pantry</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiryDate" className="text-right">
              Expiry Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
             <Label className="text-right">Scan</Label>
             <Button variant="outline" className="col-span-3">
                <Camera className="mr-2 h-4 w-4" /> Scan Barcode/Item
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

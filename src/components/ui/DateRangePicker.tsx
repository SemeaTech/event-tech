import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Filter } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { DateRange } from "react-day-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface IDateRangePickerProps {
  className?: string;
  handleChangeDate: (date: any) => void;
  date: DateRange;
}

export function DateRangePicker({
  className,
  handleChangeDate,
  date,
}: IDateRangePickerProps) {
  return (
    <div className="flex gap-2">
      <div className={cn("grid gap-2 w-full", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"  
              variant={"outline"}
              className="w-full py-6 justify-start"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {new Intl.DateTimeFormat("pt-BR", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(date.from))} {" - "}
                   {new Intl.DateTimeFormat("pt-BR", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(date.to))}
                  </>
                ) : (
                  new Intl.DateTimeFormat("pt-BR", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(date.from))
                )
              ) : (
                <span>Selecione um período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(date: any) => handleChangeDate(date)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
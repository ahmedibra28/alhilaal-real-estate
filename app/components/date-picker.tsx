'use client'

import * as React from 'react'
import { format } from 'date-fns'
// import { Calendar as CalendarIcon } from 'lucide-react'
import { HiOutlineCalendar as CalendarIcon } from 'react-icons/hi'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSelect: (date: any) => void
    selected?: Date
}

export function DatePicker({ onSelect, selected, ...props }: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(selected)

    // This handler will be passed to the Calendar component
    const handleDateChange = (selectedDate: Date) => {
        setDate(selectedDate) // update internal state
        onSelect && onSelect(selectedDate) // call the external handler
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={handleDateChange}
                    initialFocus
                    {...props}
                />
            </PopoverContent>
        </Popover>
    )
}

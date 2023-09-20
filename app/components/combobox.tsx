'use client'

import * as React from 'react'
// import { Check, ChevronsUpDown } from 'lucide-react'
import { HiOutlineCheck as Check } from 'react-icons/hi'
import { BsChevronExpand as ChevronsUpDown } from 'react-icons/bs'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Item } from '@prisma/client'

export function Combobox({
    // onSelect,
    values,
    setFieldValue,
    data,
}: {
    data: Item[]
    setFieldValue: (field: string, value: any) => void
    values: { items: number[] }
    // onSelect: () => void
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {values.items.length
                        ? values.items.join(', ')
                        : 'Select Items...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search item..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                        {data &&
                            data?.map(({ id, description }, i) => (
                                <CommandItem
                                    key={i}
                                    onDoubleClick={() => {
                                        setFieldValue('items', [id])
                                        setOpen(false)
                                    }}
                                    onSelect={() => {
                                        // check if item is already in the list
                                        if (values.items.includes(id)) {
                                            // remove item from list
                                            setFieldValue(
                                                'items',
                                                values.items.filter(
                                                    (item) => item !== id,
                                                ),
                                            )
                                        } else {
                                            setFieldValue('items', [
                                                ...values.items,
                                                id,
                                            ])
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            values.items.includes(id)
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {description}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

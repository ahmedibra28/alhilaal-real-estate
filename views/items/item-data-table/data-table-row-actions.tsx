'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/app/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Item } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useItemStore } from '@/models/itemStore'
import toast from 'react-hot-toast'
import axios from '@/lib/axios'

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const queryClient = useQueryClient()
    const { removeItem } = useItemStore((state) => state)

    const data = row.original as Item

    const { mutateAsync, error, isError } = useMutation({
        // @ts-ignore
        mutationFn: async (id: number) => {
            return removeItem(id)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(['item'])
        },
    })
    const handleRemove = async () => {
        const res = await mutateAsync(data.id)
        if (res && res?.status) {
            toast.error(res?.error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={handleRemove}>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

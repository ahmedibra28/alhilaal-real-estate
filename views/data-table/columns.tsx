'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/app/components/ui/badge'
import { Checkbox } from '@/app/components/ui/checkbox'

import { labels, priorities, statuses } from './data/data'
import { Data } from './data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Data>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'invoice',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Invoice" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue('invoice')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'paymentStatus',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Status" />
        ),
        cell: ({ row }) => {
            const label = labels.find(
                (label) => label.value === row.original.paymentStatus,
            )

            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue('paymentStatus')}
                    </span>
                </div>
            )
        },
    },

    {
        accessorKey: 'paymentMethod',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Method" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.getValue('paymentMethod')}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: 'totalAmount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Amount" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span>{row.getValue('totalAmount')}</span>
                </div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

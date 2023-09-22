'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Data } from './data/schema'
import { DataTableColumnHeader } from '../../data-table/data-table-column-header'
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
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => <div>{row.getValue('address')}</div>,
        enableSorting: true,
        enableHiding: true,
    },

    {
        accessorKey: 'contact',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact" />
        ),
        cell: ({ row }) => <div>{row.getValue('contact')}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'invoices',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Invoices" />
        ),
        cell: ({ row }) => <div>{row.original.totalInvoices}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

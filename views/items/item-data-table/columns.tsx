'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Data } from './data/schema'
import { DataTableColumnHeader } from '../../data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { fCurrency } from '@/lib/utils'

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
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => <div>{row.getValue('description')}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
        cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
        enableSorting: true,
        enableHiding: true,
    },

    {
        accessorKey: 'unitPrice',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit Price" />
        ),
        cell: ({ row }) => <div>{fCurrency(row.getValue('unitPrice'))}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'totalInvoices',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Invoices" />
        ),
        cell: ({ row }) => <div>{row.getValue('totalInvoices')}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

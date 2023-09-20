'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Data } from './data/schema'
import { DataTableColumnHeader } from '../../data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { fDate } from '@/lib/utils'

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
        accessorKey: 'documentType',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Document Type" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue('documentType')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'invoiceNumber',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Invoice Number" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue('invoiceNumber')}</div>
        ),
        enableSorting: true,
        enableHiding: false,
    },

    {
        accessorKey: 'customerName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer Name" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue('customerName')}
                <div className=" opacity-80">
                    {row.original.customerContact}
                </div>
                <div className=" opacity-80">
                    {row.original.customerAddress}
                </div>
            </div>
        ),
        enableSorting: true,
        enableHiding: false,
    },
    {
        accessorKey: 'subtotal',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sub Total" />
        ),
        cell: ({ row }) => <div>$ {row.getValue('subtotal')}</div>,
        enableSorting: true,
        enableHiding: true,
    },

    {
        accessorKey: 'totalAmount',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total Amount" />
        ),
        cell: ({ row }) => <div>$ {row.getValue('totalAmount')}</div>,
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'invoiceDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Invoice Date" />
        ),
        cell: ({ row }) => (
            <div>{fDate(new Date(row.getValue('invoiceDate')))}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'dueDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Due Date" />
        ),
        cell: ({ row }) => (
            <div>{fDate(new Date(row.getValue('dueDate')))}</div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: 'items',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Items" />
        ),
        cell: ({ row }) => (
            <div className=" opacity-80">
                <div>{row.original.items.description}</div>
                <div>{row.original.items.unitPrice}</div>
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]

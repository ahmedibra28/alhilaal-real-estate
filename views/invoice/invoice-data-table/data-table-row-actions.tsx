'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/app/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'

import { useInvoiceStore } from '@/models/invoiceStore'
import { Invoice } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePDF } from '@/lib/pdf/invoice'
import { InvoicePDFDialog } from '../invoice-pdf-dialog'

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const queryClient = useQueryClient()
    const {
        isQuotation,
        generateQuotation,
        removeInvoice,
        invoice: { data: invoices },
        status,
    } = useInvoiceStore((state) => state)

    const data = row.original as Invoice
    const { mutate: convertMutation } = useMutation({
        // @ts-ignore
        mutationFn: (id: number) => generateQuotation(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['invoice'])
        },
    })

    const { mutate } = useMutation({
        // @ts-ignore
        mutationFn: (id: number) => removeInvoice(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries(['invoice'])
        },
    })

    const handleConvertMutation = () => {
        convertMutation(data.id)
    }

    const handleRemove = () => {
        mutate(data.id)
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
                {/* <DropdownMenuItem> */}
                <InvoicePDFDialog
                    invoice={invoices?.find((item) => item.id == data.id)}
                />
                {/* </DropdownMenuItem> */}
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleConvertMutation}>
                    Convert{' '}
                    {!isQuotation(data as Invoice) ? 'Quotation' : ' Invoice'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleRemove}>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

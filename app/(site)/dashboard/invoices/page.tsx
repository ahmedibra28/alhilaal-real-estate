'use client'

import { IInvoiceStore, useInvoiceStore } from '@/models/invoiceStore'
import { columns } from '@/views/invoice/invoice-data-table/columns'
import { DataTable } from '@/views/invoice/invoice-data-table/data-table'
import { useQuery } from '@tanstack/react-query'

export default function InvoicesPage() {
    const { status, invoice, fetchInvoices } = useInvoiceStore((state) => state)

    const { data } = useQuery({
        queryKey: ['invoice'],
        queryFn: fetchInvoices,
        refetchOnWindowFocus: false,
    })
    const response = data as unknown as IInvoiceStore['invoice']

    const invoices = status === 'done' ? response?.data || invoice?.data : []

    return (
        <>
            <div className="flex h-full flex-1 flex-col space-y-8 p-8  ">
                <DataTable data={invoices as any} columns={columns} />
            </div>
        </>
    )
}

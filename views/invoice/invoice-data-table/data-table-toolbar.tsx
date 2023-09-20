'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'
// import { InvoicePDF } from '@/lib/pdf/invoice'
// import { PDFDownloadLink } from '@react-pdf/renderer'
// import { useInvoiceStore } from '@/models/invoiceStore'
import Link from 'next/link'
// import { Invoice } from '@prisma/client'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    // const {
    //     status,
    //     invoice: { data },
    // } = useInvoiceStore((state) => state)

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Invoices by Document ..."
                    value={
                        (table
                            .getColumn('documentType')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('documentType')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
            {/* 
            <PDFDownloadLink
                document={<InvoicePDF invoice={data[0]} />}
                fileName="invoice.pdf"
            >
                {({ loading }: { loading: boolean }) => (
                    <Button className="ml-4" variant={'outline'}>
                        {loading ? 'Loading..' : 'Export PDF'}
                    </Button>
                )}
            </PDFDownloadLink> */}

            <Link href={'invoices/new'} className="ml-5">
                <Button>New Invoice</Button>
            </Link>
        </div>
    )
}

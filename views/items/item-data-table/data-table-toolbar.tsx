'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'
// import { priorities, statuses } from './data/data'
// import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { NewEditInvoice } from '../../invoice'
// import { InvoicePDF } from '@/lib/pdf/invoice'
// import { PDFDownloadLink } from '@react-pdf/renderer'
import { useInvoiceStore } from '@/models/invoiceStore'
import { NewEditItem } from '../new-edit-item'
// import { Invoice } from '@prisma/client'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const {
        invoice: { data },
    } = useInvoiceStore((state) => state)

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter Invoices by Document ..."
                    value={
                        (table
                            .getColumn('description')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('description')
                            ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {/* {table.getColumn('documentType') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('documentType')}
                        title="Status"
                        options={statuses}
                    />
                )} */}

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

            {/* <PDFDownloadLink
                document={<InvoicePDF invoice={data} />}
                fileName="invoice.pdf"
            >
                {({ loading }: { loading: boolean }) => (
                    <Button className="ml-4" variant={'outline'}>
                        {loading ? 'Loading..' : 'Export PDF'}
                    </Button>
                )}
            </PDFDownloadLink> */}
            <NewEditItem />
        </div>
    )
}

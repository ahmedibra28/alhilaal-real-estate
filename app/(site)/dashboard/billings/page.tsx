'use client'

import { IBillingStore, useBillingStore } from '@/models/billingStore'
import { columns } from '@/views/billing/billing-data-table/columns'
import { DataTable } from '@/views/billing/billing-data-table/data-table'
import { useQuery } from '@tanstack/react-query'

export default function BillingsPage() {
    const { billing, fetchBillings } = useBillingStore((state) => state)

    const { data, isSuccess } = useQuery({
        queryKey: ['billing'],
        queryFn: fetchBillings,
    })
    const response = data as unknown as IBillingStore['billing']

    const billings = isSuccess ? response?.data || billing?.data : []

    return (
        <>
            <div className="flex h-full flex-1 flex-col space-y-8 p-8  ">
                <DataTable data={billings as any} columns={columns} />
            </div>
        </>
    )
}

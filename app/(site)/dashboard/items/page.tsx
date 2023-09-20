'use client'

import { useItemStore, IItemStore } from '@/models/itemStore'
import { columns } from '@/views/items/item-data-table/columns'
import { DataTable } from '@/views/items/item-data-table/data-table'
import { useQuery } from '@tanstack/react-query'

export default function BillingsPage() {
    const { item, fetchItems } = useItemStore((state) => state)

    const { data, isSuccess } = useQuery({
        queryKey: ['item'],
        queryFn: fetchItems,
    })
    const response = data as unknown as IItemStore['item']

    const billings = isSuccess ? response?.data || item?.data : []

    return (
        <>
            <div className="flex h-full flex-1 flex-col space-y-8 p-8  ">
                <DataTable data={billings as any} columns={columns} />
            </div>
        </>
    )
}

// 'use client'

import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { z } from 'zod'

import { columns } from '@/views/data-table/columns'
import { DataTable } from '@/views/data-table/data-table'
import { dataSchema } from '@/views/data-table/data/schema'

export const metadata: Metadata = {
    title: 'Invoice',
    description: 'A Invoice and issue tracker build using Tanstack Table.',
}

async function getInvoices() {
    const invoices = await fs.readFile(
        path.join(process.cwd(), 'views/data-table/data', 'invoices.json'),
    )

    const data = JSON.parse(invoices.toString())

    return z.array(dataSchema).parse(data)
}

export default async function InvoicesPage() {
    const invoices = await getInvoices()

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable data={invoices} columns={columns} />
            </div>
        </>
    )
}

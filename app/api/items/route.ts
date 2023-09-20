import { getErrorResponse } from '@/lib/helpers'
import { isAuth } from '@/lib/isAuth'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        await isAuth()
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') as string) || 1
        const limit = parseInt(searchParams.get('limit') as string) || 25
        const skip = (page - 1) * limit

        let data = await prisma.item.findMany({
            take: limit,
            skip,
            include: {
                invoices: true,
                _count: {
                    select: { invoices: true },
                },
            },
        })

        data = data.map((record) => {
            const records = {
                ...record,
                totalInvoices: record._count.invoices,
            }
            // @ts-expect-error
            delete record['_count']

            return records
        })

        const total = await prisma.item.count()

        const pages = Math.ceil(total / limit)

        return NextResponse.json(
            {
                startIndex: skip + 1,
                endIndex: skip + data.length,
                count: data.length,
                currentPage: page,
                numberOfPages: pages,
                data,
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

export async function POST(req: Request) {
    const body = (await req.json()) as Prisma.ItemCreateInput

    const { quantity, description, unitPrice } = body
    try {
        await isAuth()

        const newBillingDetail = await prisma.item.create({
            data: {
                quantity: Number(quantity),
                description,
                unitPrice: Number(unitPrice),
            },
        })
        return NextResponse.json(
            {
                ...newBillingDetail,
            },
            { status: 201 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

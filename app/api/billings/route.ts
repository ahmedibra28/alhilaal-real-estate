import { getErrorResponse } from '@/lib/helpers'
import { isAuth } from '@/lib/isAuth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        await isAuth()
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') as string) || 1
        const limit = parseInt(searchParams.get('limit') as string) || 25
        const skip = (page - 1) * limit

        let data = await prisma.billingDetails.findMany({
            take: limit,
            skip,
            include: {
                invoices: true,
                _count: {
                    select: {
                        invoices: true,
                    },
                },
            },
        })

        data = data.map((record) => {
            return {
                ...record,
                totalInvoices: record._count.invoices,
            }
        })
        const total = await prisma.billingDetails.count()

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
    const body = await req.json()

    try {
        await isAuth()
        const newBillingDetail = await prisma.billingDetails.create({
            data: { ...body },
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

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getErrorResponse } from '@/lib/helpers'
import { Invoice, Item } from '@prisma/client'
import { isAuth } from '@/lib/isAuth'
import { getCookie } from 'cookies-next'

type ReqBody = Omit<Invoice, 'id'> & {
    items: Item['id']
}

export async function GET(req: Request, res: NextResponse) {
    try {
        await isAuth()

        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') as string) || 1
        const limit = parseInt(searchParams.get('limit') as string) || 25
        const skip = (page - 1) * limit

        const data = await prisma.invoice.findMany({
            take: limit,
            skip,
            include: {
                billingDetails: true,
                items: true,
            },
        })

        const total = await prisma.invoice.count()

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

export async function POST(req: NextRequest) {
    const body: ReqBody = await req.json()
    try {
        await isAuth()

        const newInvoiceNumber = await generateNextInvoiceNumber()
        body.invoiceNumber = newInvoiceNumber

        body.billingDetailsId = Number(body.billingDetailsId)

        let item: Item['id'][] = []
        // Step 1 and 2
        if (body.items) {
            item = Array.isArray(body.items) ? body.items : [body.items]
        }

        // Step 3
        item = item.filter(Boolean)

        // Step 4
        const items = await prisma.item.findMany({
            where: {
                id: {
                    in: item,
                },
            },
        })

        const totalAmount = items.reduce((acc, item) => {
            return acc + Number(body.subtotal) + item.unitPrice
        }, 0)

        const data = await prisma.invoice.create({
            data: {
                ...body,
                subtotal: Number(body.subtotal),
                totalAmount: Number(totalAmount),
                items: {
                    connect: item?.map((pre) => ({ id: pre })),
                },
            },
        })
        return NextResponse.json(
            {
                message: 'create',
                data,
            },
            { status: 201 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

export async function PUT(req: NextRequest) {
    const body: Invoice = await req.json()
    try {
        await isAuth()

        const data = await prisma.invoice.update({
            where: { id: body.id },
            data: {
                ...body,
            },
            include: {
                items: true,
            },
        })
        return NextResponse.json(
            {
                message: 'update',
                data,
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

async function generateNextInvoiceNumber(): Promise<string> {
    // Fetch the latest invoice from the database
    const latestInvoice = await prisma.invoice.findFirst({
        orderBy: {
            id: 'desc',
        },
    })

    let nextNumber = 1 // Default value if no invoices exist

    if (latestInvoice && latestInvoice.invoiceNumber) {
        const numberPart = parseInt(latestInvoice.invoiceNumber.split('-')[1])
        nextNumber = numberPart + 1
    }

    // Format the number with leading zeros
    const formattedNumber = String(nextNumber).padStart(3, '0')

    return `INV-${formattedNumber}`
}

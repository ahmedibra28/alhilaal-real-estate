import { getErrorResponse } from '@/lib/helpers'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuth } from '@/lib/isAuth'

export async function PUT(
    req: Request,
    { params }: { params: { id: string } },
) {
    try {
        await isAuth()
        const findInvoice = await prisma.invoice.findUnique({
            where: { id: Number(params.id) },
        })
        if (!findInvoice) {
            return getErrorResponse('Invoice not found', 404)
        }

        const data = await prisma.invoice.update({
            where: { id: Number(params.id) },
            data: {
                // ...findInvoice,
                documentType:
                    findInvoice.documentType === 'INVOICE'
                        ? 'QUOTATION'
                        : 'INVOICE',
            },
        })
        return NextResponse.json(
            {
                ...data,
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

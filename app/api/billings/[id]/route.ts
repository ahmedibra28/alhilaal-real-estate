import { getErrorResponse } from '@/lib/helpers'
import { isAuth } from '@/lib/isAuth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
    req: Request,
    { params }: { params: { id: number } },
) {
    try {
        await isAuth()
        const data = await prisma.billingDetails.findUnique({
            where: { id: Number(params.id) },
            include: { invoices: true },
        })
        if (!data) {
            return getErrorResponse('Billing Detail not found', 404)
        }
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

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
) {
    const { id } = params
    try {
        await isAuth()
        const billings = await prisma.billingDetails.findUnique({
            where: { id: Number(id) },
            include: { invoices: true },
        })

        if (!billings) {
            return getErrorResponse('Billings not found', 404)
        }

        if (billings.invoices.length > 0) {
            return getErrorResponse(
                'Billings has invoices attached, cannot delete',
                400,
            )
        }
        await prisma.billingDetails.delete({
            where: { id: Number(id) },
        })
        return NextResponse.json(
            {
                message: 'delete',
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

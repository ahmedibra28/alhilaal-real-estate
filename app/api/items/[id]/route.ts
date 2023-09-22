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
        const data = await prisma.item.findUnique({
            where: { id: Number(params.id) },
            include: { invoices: true },
        })
        if (!data) {
            return getErrorResponse('Item not found', 404)
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
        // find this item if he has invoices attached don't delete
        const item = await prisma.item.findUnique({
            where: { id: Number(id) },
            include: { invoices: true },
        })
        if (!item) {
            return getErrorResponse('Item not found', 404)
        }

        if (item.invoices.length > 0) {
            return getErrorResponse(
                'Item has invoices attached, cannot delete',
                400,
            )
        }

        await prisma.item.delete({
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

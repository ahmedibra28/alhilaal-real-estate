import { getErrorResponse } from '@/lib/helpers'
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { isAuth } from '@/lib/isAuth'

export async function GET(
    req: Request,
    { params }: { params: { id: number } },
) {
    try {
        await isAuth()

        const data = await prisma.invoice.findUnique({
            where: { id: Number(params.id) },
            include: {
                items: true,
            },
        })
        if (!data) {
            return getErrorResponse('Invoice not found', 404)
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
    try {
        await isAuth()
        await prisma.invoice.delete({
            where: { id: Number(params.id) },
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

import { getErrorResponse } from '@/lib/helpers'
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    req: Request,
    { params }: { params: { id: number } },
) {
    try {
        const data = await prisma.invoice.findUnique({
            where: { id: Number(params.id) },
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
        return getErrorResponse(error.message)
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const { id } = params
        console.log(id)
        await prisma.invoice.delete({
            where: { id: Number(id) },
        })
        return NextResponse.json(
            {
                message: 'delete',
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message)
    }
}

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getErrorResponse } from '@/lib/helpers'
import { Invoice } from '@prisma/client'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') as string) || 1
        const limit = parseInt(searchParams.get('limit') as string) || 25
        const skip = (page - 1) * limit

        const data = await prisma.invoice.findMany({
            take: limit,
            skip,
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
        return getErrorResponse(error.message)
    }
}

export async function POST(req: NextRequest) {
    const body: Invoice = await req.json()
    try {
        const data = await prisma.invoice.create({
            data: body,
        })
        return NextResponse.json(
            {
                message: 'create',
                data,
            },
            { status: 201 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message)
    }
}

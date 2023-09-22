import { getErrorResponse } from '@/lib/helpers'
import { isAuth } from '@/lib/isAuth'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await isAuth()
        const data = await prisma.invoice.findMany()
        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

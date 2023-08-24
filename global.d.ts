import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

declare global {
    var mongoose: any
    var prisma: PrismaClient
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string
        }
    }
}

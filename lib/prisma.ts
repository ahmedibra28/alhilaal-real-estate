import { PrismaClient } from '@prisma/client'

const prismaClient = () => {
    return new PrismaClient()
}

type PrismaClientProps = ReturnType<typeof prismaClient>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientProps | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

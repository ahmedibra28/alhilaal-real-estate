import { Item } from '@prisma/client'

export type Data = Item & {
    totalInvoices: number
}

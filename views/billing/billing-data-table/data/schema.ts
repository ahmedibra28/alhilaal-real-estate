import { BillingDetails } from '@prisma/client'

export type Data = BillingDetails & {
    totalInvoices: number
}

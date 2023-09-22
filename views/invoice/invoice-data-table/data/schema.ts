import { Invoice, Item } from '@prisma/client'

export type Data = Invoice & {
    items: Item
}

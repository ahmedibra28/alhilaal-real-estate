import { create } from 'zustand'
import { Item, Prisma } from '@prisma/client'
import api from '@/services/api'

type ItemWithPagination = {
    count: number
    currentPage: number
    endIndex: number
    numberOfPages: number
    startIndex: number
}

export type IItemStore = {
    item: {
        data: Item[] | null
    } & ItemWithPagination
    addItem: (Item: Prisma.ItemCreateInput) => void
    removeItem: (id: number) => void
    status: 'idle' | 'loading' | 'failed' | 'done'
    fetchItems: () => void
}

export const useItemStore = create<IItemStore>((set) => ({
    item: {
        data: null,
        count: 0,
        currentPage: 0,
        endIndex: 0,
        numberOfPages: 0,
        startIndex: 0,
    },
    status: 'idle',
    addItem: async (item: Prisma.ItemCreateInput) => {
        set({ status: 'loading' })
        const response = await api.item.createItem(item)
        try {
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },

    async removeItem(id) {
        set({ status: 'loading' })
        return await api.item
            .deleteItem(id)
            .then((res) => {
                if (!(res && res?.status === 'error')) {
                    set({ status: 'done' })
                    return res
                }
                set({ status: 'failed' })
                return res.error
            })
            .catch((err) => {
                set({ status: 'failed' })
            })
    },

    fetchItems: async () => {
        set({ status: 'loading' })
        const response = await api.item.getItems().then((res) => {
            console.log('RESPONSE', res)
            return res as unknown as IItemStore['item']
        })
        try {
            set({ status: 'done' })
            set({ item: response })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
        }
    },
}))

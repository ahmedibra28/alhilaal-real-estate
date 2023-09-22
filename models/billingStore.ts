import { create } from 'zustand'
import { BillingDetails, Prisma } from '@prisma/client'
import api from '@/services/api'

type BillingWithPagination = {
    count: number
    currentPage: number
    endIndex: number
    numberOfPages: number
    startIndex: number
}

export type IBillingStore = {
    billing: {
        data: BillingDetails[] | null
    } & BillingWithPagination
    addBilling: (billing: Prisma.BillingDetailsCreateInput) => void
    removeBilling: (id: number) => void
    status: 'idle' | 'loading' | 'failed' | 'done'
    fetchBillings: () => void
}

export const useBillingStore = create<IBillingStore>((set, get) => ({
    billing: {
        data: null,
        count: 0,
        currentPage: 0,
        endIndex: 0,
        numberOfPages: 0,
        startIndex: 0,
    },
    status: 'idle',
    addBilling: async (billing: Prisma.BillingDetailsCreateInput) => {
        set({ status: 'loading' })
        const response = await api.billing.createBilling(billing)
        try {
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },

    async removeBilling(id) {
        set({ status: 'loading' })
        const response = await api.billing.deleteBilling(id)
        try {
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },

    fetchBillings: async () => {
        set({ status: 'loading' })
        const response = await api.billing.getBillings().then((res) => {
            console.log('RESPONSE', res)
            return res as unknown as IBillingStore['billing']
        })
        try {
            set({ status: 'done' })
            set({ billing: response })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
        }
    },
}))

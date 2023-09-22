import { create } from 'zustand'
import { Invoice, Prisma } from '@prisma/client'
import api from '@/services/api'

type InvoiceWithPagination = {
    count: number
    currentPage: number
    endIndex: number
    numberOfPages: number
    startIndex: number
}

export type IInvoiceStore = {
    invoice: {
        data: Invoice[] | null
    } & InvoiceWithPagination
    openModal: boolean
    onOpenModal: (value?: boolean) => void
    addInvoice: (invoice: Prisma.InvoiceCreateInput) => void
    removeInvoice: (id: number) => void
    status: 'idle' | 'loading' | 'failed' | 'done'
    fetchInvoices: () => Promise<void>
    isQuotation: (item: Invoice) => boolean
    generateQuotation: (id: number) => Promise<any | null>
    currentInvoice: Invoice | null
    setCurrentInvoice: (invoice: Invoice | null) => void
}

export const useInvoiceStore = create<IInvoiceStore>((set, get) => ({
    invoice: {
        data: null,
        count: 0,
        currentPage: 0,
        endIndex: 0,
        numberOfPages: 0,
        startIndex: 0,
    },
    openModal: false,
    status: 'idle',
    currentInvoice: null,
    setCurrentInvoice(invoice: Invoice | null) {
        set({ currentInvoice: invoice })
    },
    onOpenModal(value?: boolean) {
        set({ openModal: value || !get().openModal })
    },
    addInvoice: (invoice: Prisma.InvoiceCreateInput) => {
        set({ status: 'loading' })
        const response = api.invoice.createInvoice(invoice)
        try {
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },
    generateQuotation: async (id: number) => {
        set({ status: 'loading' })
        const response = await api.invoice.generateQuotation(id)
        try {
            await get().fetchInvoices()
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },
    removeInvoice: async (id: number) => {
        set({ status: 'loading' })
        const response = await api.invoice.deleteInvoice(id)
        try {
            set({ status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },
    fetchInvoices: async (): Promise<any> => {
        set({ status: 'loading' })
        const response = await api.invoice.getInvoices().then((res) => {
            return res as unknown as IInvoiceStore['invoice']
        })
        try {
            set({ invoice: response, status: 'done' })
            return response
        } catch (error) {
            console.error(error)
            set({ status: 'failed' })
            return null
        }
    },
    isQuotation: (item: Invoice) => item.documentType === 'QUOTATION',
}))

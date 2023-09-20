import axios from '@/lib/axios'
import { IInvoiceStore } from '@/models/invoiceStore'
import { IBillingStore } from '@/models/billingStore'
import { Prisma } from '@prisma/client'

class InvoiceApi {
    async getInvoices(): Promise<IInvoiceStore | null> {
        const response = await axios
            .get('/invoices')
            .then((response) => response)
        try {
            return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getInvoice(id: string) {
        try {
            return await axios
                .get(`/invoices/${id}`)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createInvoice(invoice: Prisma.InvoiceCreateInput) {
        try {
            return await axios
                .post('/invoices', invoice)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteInvoice(id: number) {
        try {
            console.log(id)
            return await axios
                .delete(`/invoices/${id}`)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async generateQuotation(id: number) {
        try {
            return await axios
                .put(`/invoices/${id}/generate`)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

class BillingApi {
    async getBillings(): Promise<IBillingStore | null> {
        const response = await axios
            .get('/billings')
            .then((response) => response)
        try {
            return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getBilling(id: string) {
        try {
            return await axios
                .get(`/billings/${id}`)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createBilling(billing: Prisma.BillingDetailsCreateInput) {
        try {
            return await axios
                .post('/billings', billing)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteBilling(id: number) {
        try {
            return await axios
                .delete(`/billings/${id}`)
                .then((response) => response.data)
        } catch (error) {
            return error?.response?.data
        }
    }
}

class ItemApi {
    async getItems() {
        try {
            return await axios.get('/items').then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getItem(id: string) {
        try {
            return await axios
                .get(`/items/${id}`)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async createItem(item: Prisma.ItemCreateInput) {
        try {
            return await axios
                .post('/items', item)
                .then((response) => response.data)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteItem(id: number) {
        try {
            return await axios
                .delete(`/items/${id}`)
                .then((response) => response.data)
        } catch (error) {
            return error?.response?.data
        }
    }
}

// global extends all the other apis and makes them available in one place

class GlobalApi {
    invoice = new InvoiceApi()
    billing = new BillingApi()
    item = new ItemApi()

    constructor() {
        this.invoice = new InvoiceApi()
        this.billing = new BillingApi()
        this.item = new ItemApi()
    }
}

const api = new GlobalApi()

export default api

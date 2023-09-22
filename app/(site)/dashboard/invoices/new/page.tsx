'use client'
import { Combobox } from '@/app/components/combobox'
import { DatePicker } from '@/app/components/date-picker'
import { Textarea } from '@/app/components/ui'
import { Button } from '@/app/components/ui/button'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select'
import InvoiceValidationSchema from '@/lib/validations'
import { useInvoiceStore } from '@/models/invoiceStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik, FormikProvider, Form } from 'formik'
import toast from 'react-hot-toast'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGlobalQuery } from '@/app/hooks/useGlobalQuery'
import { useEffect } from 'react'

export default function NewEditInvoice() {
    const queryClient = useQueryClient()
    const { addInvoice, currentInvoice } = useInvoiceStore((state) => state)
    const router = useRouter()
    const isEdit = currentInvoice?.id ? true : false

    const { data } = useGlobalQuery({
        queryKey: ['get-all-items'],
        url: 'items/all',
    })

    const { data: billings } = useGlobalQuery({
        queryKey: ['get-all-billings'],
        url: 'billings/all',
    })

    const { mutate, isLoading, isSuccess } = useMutation({
        // @ts-ignore
        mutationFn: addInvoice,
        onSuccess: () => {
            router.push('/dashboard/invoices')
            queryClient.invalidateQueries(['invoice'])
        },
    })

    const formik = useFormik({
        initialValues: {
            documentType: '',
            invoiceDate: '',
            dueDate: '',
            customerName: '',
            customerAddress: '',
            customerContact: '',
            subtotal: 0,
            totalAmount: 0,
            paymentTerms: '',
            termsAndConditions: '', // Optional
            notes: '',
            items: [],
            createdBy: '',
            billingDetailsId: 1,
        },
        validationSchema: InvoiceValidationSchema,
        onSubmit: (values) => {
            const { subtotal, totalAmount, dueDate, invoiceDate } = values

            // Convert the dates to JavaScript Date objects
            const invoiceDateObj = new Date(invoiceDate)
            const dueDateObj = new Date(dueDate)

            // Check if the invoiceDate is the same or after the dueDate
            if (invoiceDateObj >= dueDateObj) {
                toast.error(
                    'The invoice date cannot be the same as or after the due date.',
                )
                return // Exit the function early without mutating the values
            }

            // make sum of subtotal and totalAmount
            const sum = subtotal + totalAmount
            // set the sum to totalAmount
            values.totalAmount = sum

            // @ts-ignore
            mutate(values)
            isSuccess && toast.success('Successfully Created Invoice!')
        },
    })

    const {
        handleSubmit,
        errors,
        touched,
        values,
        getFieldProps,
        handleBlur,
        handleChange,
        setFieldValue,
        ...props
    } = formik

    console.log(values)
    return (
        <FormikProvider value={formik}>
            <Form
                onSubmit={handleSubmit}
                noValidate
                {...props}
                className="max-w-5xl lg:mx-auto mx-4 mt-8"
            >
                <Link href={'/dashboard/invoices'}>
                    <Button
                        variant={'ghost'}
                        className="inline-flex gap-2 -ml-2 mb-3"
                    >
                        <HiOutlineArrowLeft className="text-md" />
                        Back to Invoices
                    </Button>
                </Link>

                <h1 className="text-3xl font-bold">
                    {isEdit ? 'Edit' : 'Create New'} Invoice
                </h1>
                <p>Fill in the form below to create a new invoice.</p>
                <div className="grid grid-cols-2 gap-x-10 gap-y-4 py-4">
                    {/* Document Type - If this should be an input, replace accordingly */}
                    <div>
                        <Label htmlFor="documentType">Document Type</Label>

                        <Select
                            onValueChange={(value) => {
                                setFieldValue('documentType', value)
                            }}
                            name="documentType"
                            defaultValue={formik.values.documentType}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Document Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="QUOTATION">
                                    QUOTATION
                                </SelectItem>
                                <SelectItem value="INVOICE">INVOICE</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Invoice Date */}
                    <div>
                        <Label htmlFor="invoiceDate">Invoice Date</Label>

                        <DatePicker
                            selected={values.invoiceDate}
                            onSelect={(selectedDate) => {
                                setFieldValue('invoiceDate', selectedDate)
                            }}
                            {...getFieldProps('invoiceDate')}
                        />
                    </div>

                    {/* Due Date   */}
                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <DatePicker
                            selected={values.dueDate}
                            onSelect={(selectedDate) => {
                                setFieldValue('dueDate', selectedDate)
                            }}
                            {...getFieldProps('dueDate')}
                        />
                    </div>

                    {/* Customer Name */}
                    <div>
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                            id="customerName"
                            name="customerName"
                            value={formik.values.customerName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    {/* Customer Address */}
                    <div>
                        <Label htmlFor="customerAddress">
                            Customer Address
                        </Label>
                        <Input
                            id="customerAddress"
                            name="customerAddress"
                            value={formik.values.customerAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* Customer Contact */}
                    <div>
                        <Label htmlFor="customerContact">
                            Customer Contact
                        </Label>
                        <Input
                            id="customerContact"
                            name="customerContact"
                            value={formik.values.customerContact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* Createdby */}
                    <div>
                        <Label htmlFor="createdBy">Created By</Label>
                        <Input
                            id="createdBy"
                            name="createdBy"
                            value={formik.values.createdBy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* Subtotal */}
                    <div>
                        <Label htmlFor="subtotal">Sub Total</Label>
                        <Input
                            id="subtotal"
                            name="subtotal"
                            value={formik.values.subtotal}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div>
                        <Label htmlFor="itemId">Select Items</Label>
                        <Combobox
                            values={values}
                            setFieldValue={setFieldValue}
                            data={data}
                        />
                    </div>

                    <div>
                        <Label htmlFor="billingDetailsId">
                            Billing Detials
                        </Label>

                        <Select
                            onValueChange={(value) => {
                                console.log(value)
                                setFieldValue('billingDetailsId', value)
                            }}
                            name="billingDetailsId"
                            defaultValue={formik.values.billingDetailsId}
                        >
                            <SelectTrigger>
                                <SelectValue>
                                    {
                                        billings?.find(
                                            (b) =>
                                                b.id ==
                                                formik.values.billingDetailsId,
                                        )?.name
                                    }
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {billings?.map((billing) => (
                                    <SelectItem
                                        key={billing.id}
                                        value={billing.id}
                                    >
                                        {billing.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* paymentTerms */}
                    <div>
                        <Label htmlFor="paymentTerms">Payment Terms</Label>

                        <Textarea
                            id="paymentTerms"
                            name="paymentTerms"
                            value={formik.values.paymentTerms}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* paymentTerms */}
                    <div>
                        <Label htmlFor="termsAndConditions">
                            Terms and Conditions
                        </Label>

                        <Textarea
                            id="termsAndConditions"
                            name="termsAndConditions"
                            value={formik.values.termsAndConditions}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
                <div className="flex justify-end items-end">
                    <Button
                        size={'lg'}
                        type="submit"
                        onClick={handleSubmit as any}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                                Submitting
                            </>
                        ) : isEdit ? (
                            'Save changes'
                        ) : (
                            'Create Invoice'
                        )}
                    </Button>
                </div>
            </Form>
        </FormikProvider>
    )
}

'use client'
import { Button } from '@/app/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import * as Yup from 'yup'
import { useFormik, FormikProvider, Form } from 'formik'
import { useState } from 'react'
import { Invoice } from '@prisma/client'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import { InvoicePDF } from '@/lib/pdf/invoice'
import { useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'

export function InvoicePDFDialog({ invoice }: { invoice: Invoice }) {
    const [open, setOpen] = useState(false)
    const { mutate, isLoading } = useMutation({
        mutationFn: async ({
            base64data,
            email,
        }: {
            base64data: string
            email: string
        }) => {
            return await axios.post('/invoices/send', {
                pdfData: base64data,
                email: email,
            })
        },
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Invalid Email')
                .required('Email is Required'),
        }),
        onSubmit: async (values) => {
            const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob()
            const reader: any = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = function () {
                const base64data = reader.result.split(',')[1]
                // Send base64data to API route
                mutate({ base64data, email: values.email })
            }
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

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} noValidate {...props}>
                <Dialog open={open}>
                    <DialogTrigger asChild>
                        <Button
                            variant={'outline'}
                            className="w-full"
                            onClick={() => setOpen(true)}
                        >
                            Get PDF
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        onClick={() => setOpen(false)}
                        className="lg:max-w-[550px] md:max-w-[490px] max-w-[425px]"
                    >
                        <DialogHeader>
                            <DialogTitle>Get The PDF Invoice</DialogTitle>
                            <DialogDescription>
                                Send the PDF invoice to the customer email
                                address
                            </DialogDescription>
                        </DialogHeader>
                        <div className="">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {touched.email && errors.email ? (
                                    <div className="text-xs pt-2 text-red-600">
                                        {errors.email}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                type="submit"
                                onClick={handleSubmit as any}
                            >
                                Send Email
                            </Button>

                            <PDFDownloadLink
                                document={<InvoicePDF invoice={invoice} />}
                                fileName="invoice.pdf"
                            >
                                {({ loading }: { loading: boolean }) => (
                                    <Button
                                        variant={'outline'}
                                        type="button"
                                        className="lg:mb-0 mb-2 w-full"
                                    >
                                        {loading ? 'loading...' : 'Export PDF'}
                                    </Button>
                                )}
                            </PDFDownloadLink>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Form>
        </FormikProvider>
    )
}

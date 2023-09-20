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
import { useBillingStore } from '@/models/billingStore'
import { useGlobalStore } from '@/models/globalStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik, FormikProvider, Form } from 'formik'
import { AiOutlineLoading } from 'react-icons/ai'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select'
import { fCurrency } from '@/lib/utils'

export function NewEditBilling() {
    const queryClient = useQueryClient()
    const { openModal, onOpenModal } = useGlobalStore((state) => state)
    const { addBilling } = useBillingStore((state) => state)

    const { data } = useQuery({
        queryKey: ['get-all-invoices'],
        queryFn: () => {
            return fetch('/api/invoices/all').then((res) => res.json())
        },
    })

    const { mutate, isLoading } = useMutation({
        // @ts-ignore
        mutationFn: addBilling,
        onSuccess: () => {
            onOpenModal(false)
            queryClient.invalidateQueries(['billing'])
        },
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            contact: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            contact: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            // @ts-ignore
            mutate(values)
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
                <Dialog open={openModal}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => onOpenModal(true)}
                            className="ml-4"
                        >
                            New Billing
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        onClick={() => onOpenModal(false)}
                        className="lg:max-w-[550px] md:max-w-[490px] max-w-[425px]"
                    >
                        <DialogHeader>
                            <DialogTitle>Create New Billing</DialogTitle>
                            <DialogDescription>
                                Fill in the form below to create a new Billing.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-4 py-4">
                            {/* Billing Name */}
                            <div>
                                <Label htmlFor="Name">Billing Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {/* Billing Address */}
                            <div>
                                <Label htmlFor="address">Billing Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Billing Contact */}
                            <div>
                                <Label htmlFor="contact">Billing Contact</Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    value={formik.values.contact}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleSubmit as any}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting
                                    </>
                                ) : (
                                    'Save changes'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Form>
        </FormikProvider>
    )
}

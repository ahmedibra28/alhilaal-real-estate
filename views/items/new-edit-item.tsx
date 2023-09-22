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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik, FormikProvider, Form } from 'formik'
import { useItemStore } from '@/models/itemStore'

export function NewEditItem() {
    const queryClient = useQueryClient()
    const { openModal, onOpenModal } = useGlobalStore((state) => state)
    const { addItem } = useItemStore((state) => state)

    const { mutate, isLoading } = useMutation({
        // @ts-ignore
        mutationFn: addItem,
        onSuccess: () => {
            onOpenModal(false)
            queryClient.invalidateQueries(['item'])
        },
    })

    const formik = useFormik({
        initialValues: {
            description: '',
            unitPrice: 0,
            quantity: 1,
        },
        validationSchema: Yup.object().shape({
            description: Yup.string().required('Required'),
            unitPrice: Yup.number().required('Required'),
            quantity: Yup.number().required('Required'),
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
                            New Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        onClick={() => onOpenModal(false)}
                        className="lg:max-w-[550px] md:max-w-[490px] max-w-[425px]"
                    >
                        <DialogHeader>
                            <DialogTitle>Create New Item</DialogTitle>
                            <DialogDescription>
                                Fill in the form below to create a new item.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-4 py-4">
                            {/* Item Name */}
                            <div>
                                <Label htmlFor="description">
                                    Item Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {/* Item Quantity */}
                            <div>
                                <Label htmlFor="Quantity">Item Quantity</Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    value={formik.values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Item unitPrice */}
                            <div>
                                <Label htmlFor="unitPrice">
                                    Item Unit Price
                                </Label>
                                <Input
                                    id="unitPrice"
                                    name="unitPrice"
                                    value={formik.values.unitPrice}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleSubmit as any}
                                loading={isLoading}
                            >
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Form>
        </FormikProvider>
    )
}

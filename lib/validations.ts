import * as yup from 'yup'

const InvoiceValidationSchema = yup.object().shape({
    documentType: yup
        .string()
        .oneOf(['QUOTATION', 'INVOICE'])
        .required('Document type is required'),
    invoiceDate: yup.date().required('Invoice date is required'),
    dueDate: yup.date().required('Due date is required'),
    customerName: yup.string().required('Customer name is required'),
    customerAddress: yup.string().required('Customer address is required'),
    customerContact: yup.string().required('Customer contact is required'),
    subtotal: yup
        .number()
        .min(0, 'Subtotal must be a positive value')
        .required('Subtotal is required'),
    totalAmount: yup
        .number()
        .min(0, 'Total amount must be a positive value')
        .notRequired(),
    paymentTerms: yup.string().required('Payment terms are required'),
    termsAndConditions: yup.string().nullable().notRequired(),
    notes: yup.string().nullable().notRequired(),

    createdBy: yup.string().required('Creator name is required'),
    // itemId: yup.number().required('Item Id is required'),
    // items - array of string
    items: yup.array().of(yup.string()).required('Items are required'),
})

export default InvoiceValidationSchema

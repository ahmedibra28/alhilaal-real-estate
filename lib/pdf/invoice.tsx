'use client'
import { useMemo } from 'react'
import {
    Page,
    View,
    Text,
    Font,
    Image,
    Document,
    StyleSheet,
} from '@react-pdf/renderer'
// utils
import { Invoice as IInvoice, Item } from '@prisma/client'
import { fCurrency, fDate } from '../utils'

Font.register({
    family: 'Inter',
    fonts: [
        { src: '/fonts/Inter-Regular.ttf' },
        { src: '/fonts/Inter-Bold.ttf' },
    ],
})

const useStyles = () =>
    useMemo(
        () =>
            StyleSheet.create({
                col4: { width: '25%' },
                col8: { width: '75%' },
                col6: { width: '50%' },
                mb4: { marginBottom: 4 },
                mb8: { marginBottom: 8 },
                mb40: { marginBottom: 40 },
                h3: { fontSize: 16, fontWeight: 700 },
                h4: { fontSize: 13, fontWeight: 700 },
                body1: { fontSize: 10 },
                body2: { fontSize: 9 },
                subtitle1: { fontSize: 10, fontWeight: 700 },
                subtitle2: { fontSize: 9, fontWeight: 700 },
                alignRight: { textAlign: 'right' },
                page: {
                    fontSize: 9,
                    lineHeight: 1.6,
                    fontFamily: 'Inter',
                    backgroundColor: '#FFFFFF',
                    textTransform: 'capitalize',
                    padding: '40px 24px 120px 24px',
                },
                footer: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 24,
                    margin: 'auto',
                    borderTopWidth: 1,
                    borderStyle: 'solid',
                    position: 'absolute',
                    borderColor: '#DFE3E8',
                },
                gridContainer: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                table: {
                    display: 'flex',
                    width: 'auto',
                },
                tableRow: {
                    padding: '8px 0',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#DFE3E8',
                },
                noBorder: {
                    paddingTop: 8,
                    paddingBottom: 0,
                    borderBottomWidth: 0,
                },
                tableCell_1: {
                    width: '5%',
                },
                tableCell_2: {
                    width: '50%',
                    paddingRight: 16,
                },
                tableCell_3: {
                    width: '15%',
                },
            }),
        [],
    )

// ----------------------------------------------------------------------

type Props = {
    invoice: IInvoice & { items: Item[] }
}

export function InvoicePDF({ invoice }: Props) {
    const {
        documentType,
        invoiceDate,
        dueDate,
        createdBy,
        customerAddress,
        customerContact,
        customerName,
        totalAmount,
        invoiceNumber,
        paymentTerms,
        subtotal,
        items,
    } = invoice

    const styles = useStyles()

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <Image
                        source="/logo.jpeg"
                        style={{ width: 48, height: 48 }}
                    />

                    <View
                        style={{
                            alignItems: 'flex-end',
                            flexDirection: 'column',
                        }}
                    >
                        <Text style={styles.h3}>{documentType}</Text>
                        <Text> {invoiceNumber} </Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>
                            Invoice from
                        </Text>
                        <Text style={styles.body2}>{'Al Hilaal'}</Text>
                        <Text style={styles.body2}>{'Mogadishu, Somalia'}</Text>
                        <Text style={styles.body2}>{createdBy}</Text>
                    </View>

                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>
                            Invoice to
                        </Text>
                        <Text style={styles.body2}>{customerName}</Text>
                        <Text style={styles.body2}>{customerAddress}</Text>
                        <Text style={styles.body2}>{customerContact}</Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>
                            Date create
                        </Text>
                        <Text style={styles.body2}>
                            {fDate(new Date(invoiceDate))}
                        </Text>
                    </View>
                    <View style={styles.col6}>
                        <Text style={[styles.subtitle2, styles.mb4]}>
                            Due date
                        </Text>
                        <Text style={styles.body2}>
                            {fDate(new Date(dueDate))}
                        </Text>
                    </View>
                </View>

                <Text style={[styles.subtitle1, styles.mb8]}>
                    Invoice Details
                </Text>

                <View style={styles.table}>
                    <View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell_1}>
                                <Text style={styles.subtitle2}>#</Text>
                            </View>

                            <View style={styles.tableCell_2}>
                                <Text style={styles.subtitle2}>
                                    Description
                                </Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Qty</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>Unit price</Text>
                            </View>

                            <View
                                style={[styles.tableCell_3, styles.alignRight]}
                            >
                                <Text style={styles.subtitle2}>Total</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        {items.map((item: Item, index: number) => (
                            <View style={styles.tableRow} key={item.id}>
                                <View style={styles.tableCell_1}>
                                    <Text>{index + 1}</Text>
                                </View>

                                <View style={styles.tableCell_2}>
                                    <Text>{item.description}</Text>
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{item.quantity}</Text>
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{item.unitPrice}</Text>
                                </View>

                                <View
                                    style={[
                                        styles.tableCell_3,
                                        styles.alignRight,
                                    ]}
                                >
                                    <Text>
                                        {fCurrency(
                                            item.unitPrice * item.quantity,
                                        )}
                                    </Text>
                                </View>
                            </View>
                        ))}

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text>Subtotal</Text>
                            </View>
                            <View
                                style={[styles.tableCell_3, styles.alignRight]}
                            >
                                <Text>{fCurrency(subtotal)}</Text>
                            </View>
                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1} />
                            <View style={styles.tableCell_2} />
                            <View style={styles.tableCell_3} />
                            <View style={styles.tableCell_3}>
                                <Text style={styles.h4}>Total</Text>
                            </View>
                            <View
                                style={[styles.tableCell_3, styles.alignRight]}
                            >
                                <Text style={styles.h4}>
                                    {fCurrency(totalAmount)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.footer]} fixed>
                    <View style={styles.col8}>
                        <Text style={styles.subtitle2}>Payment Terms</Text>
                        <Text>{paymentTerms}</Text>
                    </View>

                    <View style={styles.col8}>
                        <Text style={styles.subtitle2}>NOTES</Text>
                        <Text>
                            Thank you for your business. We hope you are
                            satisfied with our services.
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

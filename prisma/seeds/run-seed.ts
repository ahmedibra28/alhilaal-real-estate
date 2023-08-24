import { mockInvoices, mockBillingDetails, mockItems } from "./mock-data";
import prisma from "@/lib/prisma";

export async function Seed() {
  const billingDetails = await prisma.billingDetails.createMany({
    data: mockBillingDetails,
    skipDuplicates: true,
  });

  const items = await prisma.item.createMany({
    data: mockItems,
    skipDuplicates: true,
  });

  const invoices = await prisma.invoice.createMany({
    data: mockInvoices,
    skipDuplicates: true,
  });

  console.log({ invoices, billingDetails, items });
}

export default Seed;

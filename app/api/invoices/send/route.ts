import { getErrorResponse } from '@/lib/helpers'
import { isAuth } from '@/lib/isAuth'
import transporter from '@/lib/nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()

    try {
        await isAuth()

        const mailOptions = {
            from: 'everardo.cremin@ethereal.email',
            to: body.email,
            subject: 'Invoice PDF',
            text: 'Please find attached the invoice.',
            attachments: [
                {
                    filename: 'invoice.pdf',
                    content: new Buffer.from(body.pdfData, 'base64') as any, // Convert base64 to buffer
                },
            ],
        }

        await transporter.sendMail(mailOptions)
        return NextResponse.json(
            {
                success: true,
                message: 'Email sent!',
            },
            { status: 200 },
        )
    } catch (error: any) {
        return getErrorResponse(error.message, error?.status)
    }
}

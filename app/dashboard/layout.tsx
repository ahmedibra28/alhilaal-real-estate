import '../globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata: Metadata = {
    title: 'Alhilaal Dashboard',
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return <section>{session && session.user ? children : 'Not Found'}</section>
}

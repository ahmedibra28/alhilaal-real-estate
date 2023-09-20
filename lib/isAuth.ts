import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const isAuth = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw {
            status: 401,
            message: 'Unauthorized',
        }
    }

    return session
}

export const isAuthenticated = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return false
    }

    return true
}

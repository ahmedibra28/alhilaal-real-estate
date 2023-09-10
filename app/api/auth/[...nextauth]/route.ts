import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { getEnvVariable } from '@/lib/helpers'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
            clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
        }),
    ],
    secret: getEnvVariable('NEXT_AUTH_SECRET'),
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

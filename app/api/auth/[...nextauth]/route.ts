import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { getEnvVariable } from '@/lib/helpers'
import { NextAuthOptions } from 'next-auth'
import { isWhiteListed } from '@/lib/white-list'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
            clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
        }),
    ],
    secret: getEnvVariable('NEXT_AUTH_SECRET'),
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({ session, user, token }) {
            if (isWhiteListed(session.user?.email || '')) {
                return session
            }
            return null
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

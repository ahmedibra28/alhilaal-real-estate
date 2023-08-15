import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { getEnvVariable } from '@/lib/helpers'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
      clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }

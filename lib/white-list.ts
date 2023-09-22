const emails = ['abdizamedmo@gmail.com']

const isWhiteListed = (email: string) => emails.includes(email)

export { isWhiteListed }

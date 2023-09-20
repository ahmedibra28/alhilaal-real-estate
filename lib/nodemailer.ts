import { getEnvVariable } from './helpers'

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: getEnvVariable('SMTP_HOST'),
    port: getEnvVariable('SMTP_PORT'),
    auth: {
        user: getEnvVariable('SMTP_USER'),
        pass: getEnvVariable('SMTP_PASS'),
    },
})
export default transporter

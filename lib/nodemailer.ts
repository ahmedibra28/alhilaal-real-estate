const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'abdizamedmo@gmail.com',
        pass: 'kconuazrniqxwtpl',
    },
})
export default transporter

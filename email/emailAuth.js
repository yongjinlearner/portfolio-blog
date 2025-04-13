const User = require('../model/User')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SECURITY === 'true',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const emailAuth = async (email, token) => {
    console.log("subscribers: ", email)
    console.log("token:", token)

    const confirmUrl = process.env.CONFIRM_URL + `?token=${token}`

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Yongjin's blog: confirm your email address",
        html: `Click <a href="${confirmUrl}">HERE</a> to confirm your email address`
    });

    console.log("Message for confirmation has been sent");
}
module.exports = emailAuth
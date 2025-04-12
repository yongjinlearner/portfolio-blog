const nodemailer = require('nodemailer')
const User = require('../model/User')
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

const emailList = async () => {
    try {
        const users = await User.find();
        const list = users.map(user => user.email);
        return list;
    } catch (err) {
        console.error("Could not fetch emails:", err);
        return [];
    }
};

const sendEmail = async (subject, text) => {
    const mySubscribers = await emailList()
    console.log("subscribers: ", mySubscribers)
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        bcc: mySubscribers,
        subject: subject,
        text: text,
        html: text + " Click <a href='https://yongjinlee.onrender.com/blog.html'>HERE</a> to check out the new blog"
    });

    console.log("Message has been sent");
}

module.exports = sendEmail
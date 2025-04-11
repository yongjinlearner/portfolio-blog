const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const User = require('../model/User')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
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
async function sendEmail(subject, text) {
    const mySubscribers = await emailList()
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: mySubscribers,
        subject: subject,
        text: text,
        html: "Click <a href='#'>HERE</a> to check out the new blog" 
    });

    console.log("Message sent: %s", info.messageId);
}

sendEmail().catch(console.error);

module.exports = sendEmail
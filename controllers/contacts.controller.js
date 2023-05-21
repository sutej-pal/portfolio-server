const Contact = require('../models/contact');
const nodemailer = require("nodemailer");
const {getEnv} = require("../config/app.config");

module.exports = class ContactsController {

    static async saveContact(req, res) {
        try {
            const {name, email, message} = req.body;

            let mailSent = false;

            const response = await ContactsController.send(name, email, message)
            mailSent = response.accepted.length === 1;
            const contact = await Contact.create({
                name, email, message, mailSent
            });

            return res.json({
                message: "contact saved",
                data: {
                    contact
                }
            });
        } catch (e) {
            console.log(e);
        }

    }

    static async send(name, email, message) {
        const transporter = nodemailer.createTransport({
            host: getEnv('MAIL_HOST'),
            port: getEnv('MAIL_PORT'),
            debug: true,
            secure: getEnv('MAIL_SECURE'),
            auth: {
                user: getEnv('MAIL_USER'),
                pass: getEnv('MAIL_PASS'),
            },
        });
        const mailOptions = {
            from: getEnv('MAIL_FROM'),
            to: getEnv('MAIL_TO'),   // list of receivers
            subject: 'From Portfolio',
            text: `Name: ${name}\n\nFrom: ${email}\n\nMessage: ${message}`,
        };
        // send functionality
        return await transporter.sendMail(mailOptions)
    }

}

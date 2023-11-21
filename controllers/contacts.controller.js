const Contact = require('../models/contact');
const nodemailer = require("nodemailer");
const { getEnv } = require("../config/app.config");
module.exports = class ContactsController {
    static async saveContact(req, res) {
        try {
            const { name, email, message } = req.body;
            let mailSent = false;
            const response = await ContactsController.send(name, email, message)
            mailSent = response.accepted.length === 1;
            const contact = await Contact.create(
                { name, email, message, mailSent }
            );
            return res.json({ message: "contact saved", data: { contact } });
        } catch (e) {
            console.log(e);
        }
    } static async send(name, email, message) {
        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: getEnv('MAIL_USER'),
                    pass: getEnv('MAIL_PASS'),
                },
            });
        // Set up the email options 
        const mailOptions = {
            from: getEnv('MAIL_USER'),
            to: getEnv('MAIL_TO'),   // list of receivers 
            subject: 'Contact Mail from Portfolio',
            html: ` <div>Name: ${name}</div> <div>Mail: ${email}</div> <br> <div>${message}</div> `
        };

        // Send the email 
        transporter.sendMail(mailOptions, (error, info) => { if (error) { return console.log(error); } else { return 'Email sent'; } });
        // send functionality return 
        await transporter.sendMail(mailOptions);
    }
}
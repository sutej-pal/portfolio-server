const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    mailSent: Boolean
});

const Contact = mongoose.model("Contact", Schema);

module.exports = Contact;

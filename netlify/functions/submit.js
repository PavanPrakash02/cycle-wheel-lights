const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
    const { name, email, phone } = JSON.parse(event.body);

    const newContact = new Contact({ name, email, phone });

    try {
        await newContact.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Contact information saved successfully.' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving contact information.' })
        };
    }
};

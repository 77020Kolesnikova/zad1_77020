const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const mongoURI = 'mongodb+srv://polina:PKMpkm12@poly.31o6pwk.mongodb.net/?appName=Poly'; 

mongoose.connect(mongoURI)
    .then(() => console.log('Połączono z bazą danych MongoDB Atlas!'))
    .catch(err => console.error('Błąd połączenia z bazą:', err));


const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);


app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            message: req.body.message
        });

        await newContact.save();
        console.log('Otrzymano i zapisano dane:', req.body);
        res.status(201).json({ success: true, message: 'Dane zapisane w bazie danych!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer backendowy działa na http://localhost:${PORT}`);
});
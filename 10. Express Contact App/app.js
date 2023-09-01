const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');

const app = express();
const port = 3000;

//? menggunakan ejs
app.set('view engine', 'ejs');

//* Third-party Middleware
app.use(expressLayouts);

//* Built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Aldy',
            email: 'aldy@gmail.com',
        },
        {
            nama: 'Ramadhan',
            email: 'ramadhan@gmail.com',
        },
    ];
    res.render('index', {
        nama: 'Aldy', 
        title: 'Home',
        mahasiswa,
        layout: 'layouts/main-layouts',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'About',
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'Contact',
        contacts,
    });
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Detail Kontak',
        contact,
    });
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


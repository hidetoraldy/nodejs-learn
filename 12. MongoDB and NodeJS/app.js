const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

//* SetUp ejs
app.set('view engine', 'ejs');

//* Third-party Middleware
app.use(expressLayouts);

//* Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

//* Konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie : { maxAge : 6000 },
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
})
);
app.use(flash());

//? Home page
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

//? About page
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'About',
    });
});

//? Contact page
app.get('/contact', async (req, res) => {

    // Contact.find().then((contact) => {
    //     res.send(contact);
    // });

    const contacts = await Contact.find();
    res.render('contact', {
        layout : 'layouts/main-layouts',
        title : 'Contact',
        contacts,
        msg : req.flash('msg'),
    });
});

//? Halaman detail kontak
app.get('/contact/:nama', async (req, res) => {
    // const contact = findContact(req.params.nama);
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Detail Kontak',
        contact,
    });
});

app.listen(port, () => {
    console.log(`Mongo Contact APP | listening at http://localhost:${port}`);
});
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

//? menggunakan ejs
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

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'About',
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', {
        layout : 'layouts/main-layouts',
        title : 'Contact',
        contacts,
        msg : req.flash('msg'),
    });
});

//? Halaman form tambah data kontak 
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        title : 'Form Tambah Data Kontak',
        layout : 'layouts/main-layouts',
    });
});

//? Proses data kontak
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat){
            throw new Error('Nama kontak sudah terdaftar');
        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No. Handphone tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array()});
        res.render('add-contact', {
            title : 'Form tambah data kontak',
            layout : 'layouts/main-layouts',
            errors : errors.array(),
        });
    } else {
        addContact(req.body);

        //? Flash message
        req.flash('msg', 'Data kontak berhasil ditambahkan');

        res.redirect('/contact');
    }
});

//? Proses delete kontak
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    //? Jika kontak tidak ada
    if (!contact) {
        res.status(404);
        res.send('error');
    } else {
        deleteContact(req.params.nama);
        //? Flash message
        req.flash('msg', 'Data kontak berhasil dihapus!');

        res.redirect('/contact');
    }
});

//? Form ubah data kontak
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
        title : 'Form Ubah Data Kontak',
        layout : 'layouts/main-layouts',
        contact, 
    });
});

//? Proses ubah data
app.post('/contact/update', [
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
        if (value !== req.body.oldNama && duplikat){
            throw new Error('Nama kontak sudah terdaftar');
        }
        return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No. Handphone tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array()});
        res.render('edit-contact', {
            title : 'Form ubah data kontak',
            layout : 'layouts/main-layouts',
            errors : errors.array(),
            contact : req.body,
        });
    } else {
        updateContacts(req.body);

        //? Flash message
        req.flash('msg', 'Data kontak berhasil diubah');

        res.redirect('/contact');
    }
});

//? Halaman detail kontak
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


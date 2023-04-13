const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

//? menggunakan ejs
app.set('view engine', 'ejs');

//* Third-party Middleware
app.use(expressLayouts);
app.use(morgan('dev'));

//* Built-in middleware
app.use(express.static('public'));

//* Application level middleware
app.use((req, res, next) => {
    console.log('Time : ', Date.now());
    next();
});

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
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'Contact',});
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


const express = require('express');
const app = express();
const port = 3000;

//? menggunakan ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.sendFile('./index.html', {root: __dirname});
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
    });
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'});
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


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hidetoraldy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



// //? Menambah 1 data
// const contact1 = new Contact({
//     nama: 'Aldy Ramadhan',
//     nohp: '081987654321',
//     email: 'aldy@gmail.com',
// });

// //? Simpan ke collection
// contact1.save().then((contact) => console.log(contact));
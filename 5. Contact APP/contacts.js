const { dir } = require('console');
//const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { resolve } = require('path');
const { rejects } = require('assert');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

//? Membuat folder data jika belum ada
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//? Membuat file contact.json jika belum ada
const dataPath = `./data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         })
//     });
// };

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };

    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    //? cek duplikasi data
    const duplikat = contacts.find((contact) => contact.email === email || contacts.find((contact) => contact.noHP === noHP));
        if (duplikat) {
            console.log(chalk.red.inverse.bold('Data contact telah terdaftar, silahkan gunakan data lain!'));
            return false;
        };
    
    //? cek validitas email
    if(!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Data email tidak valid!'));
            return false;
    };

    //? cek validitas noHP
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Data nomor Handphone tidak valid!'));
    };

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.cyan.inverse.bold(`Terima kasih telah memasukkan data.`));

    //rl.close();
};

module.exports = {
    simpanContact
}
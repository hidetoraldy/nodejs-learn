const { dir } = require('console');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
const { resolve } = require('path');
const { rejects } = require('assert');

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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };

    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file);

    const contacts = loadContact();

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
};

const listContact= () => {
    const contacts = loadContact();
    console.log(chalk.magenta.inverse.bold(`Daftar Contact : `));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    };

    console.log(chalk.magenta.inverse.bold(contact.nama));
    console.log((contact.noHP));
    if(contact.email) {
        console.log((contact.email));
    };
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
        (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if(contacts.length === newContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

    console.log(chalk.cyan.inverse.bold(`data contact ${nama} berhasil di hapus`));
};

module.exports = {
    simpanContact,
    listContact,
    detailContact,
    deleteContact
};
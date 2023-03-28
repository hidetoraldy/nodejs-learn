const { dir } = require('console');
const readline = require('readline');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        })
    });
};

const simpanContact = (nama, email, noHP) => {
    const contact = {
        nama,
        email,
        noHP
    };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(`Terima kasih telah memasukkan data.`);

    rl.close();
};

module.exports = {
    tulisPertanyaan,
    simpanContact
}
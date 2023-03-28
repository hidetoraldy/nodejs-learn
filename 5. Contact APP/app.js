//TODO Core Module
//* File System
const fs = require('fs');

// console.log(fs);

//? menuliskan string ke dalam file secara synchronus
// try {
//     fs.writeFileSync('data/test.txt', 'Hello is this world? synchronus ver.');
// } catch(e) {
//     console.log(e);
// }

//? menuliskan string ke dalam file secara asynchronus
// fs.writeFile('data/test.txt', 'Hello world asynchronus ver.', (e) => {
//     console.log(e);
// });

//? membaca file secara synchronus
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

//? membaca file secara asynchronus
// fs.readFile('data/test.txt', 'utf-8', (e, data) => {
//     if (e) throw e;
//     console.log(data);
// })

//? Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan nama Anda : ', (nama) => {
    //console.log(`Terimakasih ${nama}`);
    rl.question('Masukkan no. HP Anda : ', (noHP) => {
        // console.log(`Terima kasih ${nama} dengan no. HP ${noHP}`);
        const contact = {
            nama,
            noHP
        };
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log(`Terima kasih telah memasukkan data.`);

        rl.close();
    })
});
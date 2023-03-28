const yargs = require("yargs");
const contacts = require("./contacts");

//? Mengambil argument dari command line
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Alamat Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
});

yargs.parse();


// const contacts = require('./contacts');

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda :');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda :');
//     const noHP = await contacts.tulisPertanyaan('Masukkan no. HP anda :');

//     contacts.simpanContact(nama, email, noHP);
// };

// main();
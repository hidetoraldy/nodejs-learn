const { argv } = require("yargs");
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
}).demandCommand();

//? Menampilkan semua daftar nama contact dan noHP

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama dan no. HP contact',
    handler() {
        contacts.listContact();
    },
});

//? Menampilkan detail data dari sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

//? Menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus data contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});


yargs.parse();